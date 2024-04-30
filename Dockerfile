# ------------ STAGE: Install deps
FROM node:16.14-alpine as deps
ENV NODE_ENV development
LABEL stage=deps
WORKDIR /srv/deps
RUN yarn global add @nestjs/cli
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
COPY .env ./
COPY .npmrc ./
RUN yarn install --frozen-lockfile

# ------------ STAGE: Build app
FROM node:16.14-alpine as build
LABEL stage=build
ENV NODE_ENV production
WORKDIR /srv/build
COPY . .
COPY --from=deps /srv/deps/node_modules ./node_modules
RUN yarn build
RUN yarn install --production && yarn cache clean

# ------------ STAGE: Execute app
FROM node:16.14-alpine as execute
LABEL stage=execute
ENV NODE_ENV production
WORKDIR /srv/app
COPY --from=build /srv/build/node_modules ./node_modules
COPY --from=build /srv/build/dist ./dist
COPY --from=build /srv/build/.env.local ./.env.local
COPY --from=build /srv/build/.env ./.env
EXPOSE ${APP_PORT}
CMD ["node", "dist/main"]
