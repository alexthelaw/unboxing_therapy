FROM node:16-slim as base

RUN apt-get update && apt-get install ca-certificates libglu1 libxi6 -y

WORKDIR /app
COPY package*.json ./
EXPOSE 80

FROM base as production

RUN npm i --force
COPY . ./
RUN npm run build-release

FROM nginx

COPY --from=production /app/dist /usr/share/nginx/html
