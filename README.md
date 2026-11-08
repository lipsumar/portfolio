# portfolio

Source of my static portfolio site, [portfolio.lipsumar.io](https://portfolio.lipsumar.io).

**Stack:** Markdown project pages turned into HTML by a small Node script, bundled with Parcel and styled with Tailwind CSS.

## Requirements

- Node 24
- Yarn, enabled through Corepack (`corepack enable`)

Install dependencies with `yarn install`.

## Scripts

- `yarn dev` – generates the pages, then watches for changes and serves the site with Parcel.
- `yarn build` – generates the pages and builds the production site into `dist/`.
- `yarn generate` – regenerates the HTML pages from `projects/*/index.md` without bundling.

## Adding a project

Create a folder in `projects/` (its name is the URL slug) with:

- `index.md` – front matter (`title`, `year`, optional `order` and `links` as `label`/`url` pairs) followed by the Markdown description.
- `thumb.png` – the thumbnail shown on the home page.

Then run `yarn generate` (or `yarn dev`). The project's `index.html` and the home page are generated for you. See an existing project, such as `projects/ai-bingo/`, for an example.
