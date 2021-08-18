# develop stage
FROM node:12-alpine as develop-stage

RUN yarn global add @vue/cli

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

# build stage
FROM develop-stage as build-stage
RUN yarn run serve

# production stage
FROM nginx:1.15.7-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]