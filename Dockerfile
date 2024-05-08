# ------------ STAGE: Install deps
FROM node:20.10-alpine3.18 as deps

ENV NODE_ENV development
LABEL stage=deps

WORKDIR /srv/deps

RUN yarn global add @nestjs/cli

COPY config.json ./
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
# if use private libs uncomment this
# COPY .npmrc ./

RUN yarn install --frozen-lockfile

# ------------ STAGE: Build app
FROM node:20.10-alpine3.18 as build

LABEL stage=build
ENV NODE_ENV production

WORKDIR /srv/build

COPY . .
COPY --from=deps /srv/deps/node_modules ./node_modules

RUN yarn build
RUN yarn install --production && yarn cache clean

# ------------ STAGE: Execute app
FROM node:20.10-alpine3.18 as execute

ARG GITHUB_TOKEN
ARG ENV_URL

ENV GITHUB_TOKEN=$GITHUB_TOKEN
ENV ENV_URL=$ENV_URL
ENV NODE_ENV production

LABEL stage=execute

WORKDIR /srv/app

COPY --from=build /srv/build/config.json ./config.json
COPY --from=build /srv/build/node_modules ./node_modules
COPY --from=build /srv/build/dist ./dist
COPY --from=build /srv/build/.env.local ./.env.local

RUN apk update && apk upgrade && apk add --no-cache bash curl

CMD ["node", "dist/main.js"]

# ------------ STAGE: Build dev
FROM node:20.10-alpine3.18 as dev

LABEL stage=dev
ENV NODE_ENV development

WORKDIR /srv/app

COPY . .

RUN yarn install
RUN apk update && apk upgrade && apk add --no-cache bash git openssh curl

CMD ["yarn", "start:dev"]
