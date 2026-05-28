import { readFileSync, writeFileSync, readdirSync, statSync, watch } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const watchMode = process.argv.includes('--watch');

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function read(path) {
  return readFileSync(path, 'utf-8');
}

function write(path, content) {
  writeFileSync(path, content, 'utf-8');
  console.log(`  wrote ${path.replace(root, '')}`);
}

function generate() {
  const indexTemplate = read(join(root, 'src/templates/index.html'));
  const projectTemplate = read(join(root, 'src/templates/project.html'));

  const projectsDir = join(root, 'projects');
  const slugs = readdirSync(projectsDir).filter(name =>
    statSync(join(projectsDir, name)).isDirectory()
  );

  const projects = [];

  for (const slug of slugs) {
    const mdPath = join(projectsDir, slug, 'index.md');
    try {
      const raw = read(mdPath);
      const { data, content } = matter(raw);
      projects.push({ slug, ...data, content });
    } catch {
      // No index.md — skip (hand-written HTML project)
    }
  }

  projects.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (a.order ?? 99) - (b.order ?? 99);
  });

  for (const project of projects) {
    const linksHtml = project.links?.length
      ? `<div class="flex gap-6 mb-8">${project.links.map(l =>
          `<a href="${l.url}" target="_blank" class="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 hover:text-gray-900 transition-colors duration-200">${l.label} ↗</a>`
        ).join('\n')}</div>`
      : '';

    const html = projectTemplate
      .replaceAll('<!-- TITLE -->', project.title)
      .replace('<!-- YEAR -->', project.year ?? '')
      .replace('<!-- LINKS -->', linksHtml)
      .replace('<!-- CONTENT -->', marked.parse(project.content));

    write(join(projectsDir, project.slug, 'index.html'), html);
  }

  const byYear = {};
  for (const project of projects) {
    if (!byYear[project.year]) byYear[project.year] = [];
    byYear[project.year].push(project);
  }

  const years = Object.keys(byYear).sort((a, b) => b - a);

  const sectionsHtml = years.map(year => {
    const cards = byYear[year].map(p => `
        <a href="projects/${p.slug}/index.html" class="group">
          <div class="overflow-hidden mb-3 bg-gray-50">
            <img loading="lazy" src="projects/${p.slug}/thumb.png" alt="${p.title}" class="w-full object-cover aspect-video group-hover:scale-[1.03] transition-transform duration-500 ease-out">
          </div>
          <h2 class="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-900 transition-colors duration-200">${p.title}</h2>
        </a>`).join('');

    return `
    <section class="mb-16 sm:mb-24">
      <div class="text-[clamp(5rem,16vw,11rem)] font-black text-gray-100 leading-none select-none -mb-2 sm:-mb-4">${year}</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 gap-y-8 sm:gap-y-10">
        ${cards.trim()}
      </div>
    </section>`;
  }).join('\n');

  const indexHtml = indexTemplate.replace('<!-- PROJECTS -->', sectionsHtml.trim());
  write(join(root, 'index.html'), indexHtml);

  console.log(`\nGenerated ${projects.length} project pages + index`);
}

generate();

if (watchMode) {
  console.log('Watching for changes...');
  let debounce;
  const trigger = () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => generate(), 100);
  };
  watch(join(root, 'projects'), { recursive: true }, (_, f) => { if (f?.endsWith('.md')) trigger(); });
  watch(join(root, 'src/templates'), { recursive: true }, trigger);
}
