FROM node:24.16.0 AS builder
WORKDIR /usr/src/app
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack install
RUN yarn install --immutable
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
