# Project boilerplate: Node.js + Nest.js + Docker

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Github Test Status](https://github.com/WildEgor/e-shop-nestjs-microservice-boilerplate/actions/workflows/testing.yml/badge.svg)](https://github.com/WildEgor/e-shop-nodepack/actions/workflows/testing.yml/badge.svg)
[![codecov](https://codecov.io/gh/WildEgor/e-shop-nestjs-microservice-boilerplate/branch/main/graph/badge.svg)](https://codecov.io/gh/WildEgor/e-shop-nestjs-microservice-boilerplate)

A containerised eShopNestjsMicroserviceBoilerplate (mmm Java-style naming)

| Component         | Link                                |
| ----------------- |-------------------------------------|
| Language          | [Node.js](https://nodejs.org/)      |
| Framework         | [NestJS](https://nestjs.com/)       |
| Containerisation  | [Docker](https://www.docker.com/)   |

## Structure
- [Adapters](/src/infrastructure/adapters/README.md)
- [Configs](/src/infrastructure/configs/README.md)
- [Database](/src/infrastructure/database/README.md)
- [Domain](/src/infrastructure/domain/README.md)
- [DTO](/src/infrastructure/dtos/README.md)
- [Exceptions](src/infrastructure/exceptions/README.md)
- [Repositories](/src/infrastructure/repositories/README.md)
- [Types](/src/infrastructure/types/README.md)
- [Modules](/src/modules/README.md)
- [Decorators](/src/shared/decorators/README.md)
- [Filters](/src/shared/filters/README.md)
- [Guards](/src/shared/guards/README.md)
- [Interceptors](/src/shared/interceptors/README.md)
- [Modules](/src/shared/modules/README.md)
- [Pipes](/src/shared/pipes/README.md)
- [Utils](/src/shared/utils/README.md)

## Development

Install the dependencies:

```bash
yarn install
```

Define environment variables for your development environment:

> These are passed to the Docker container via `docker-compose.yaml` in development. When running in production, the environment variables must be passed to the container when it is run.

```bash
cp .env.example .env
```

Run locally:

> This builds the Docker image and runs it automatically with the config defined in `docker-compose.yaml`. This saves you having to build the docker image and then run a manual `docker run` command with all the flags (for environment variables, ports, etc).

Local
```bash
yarn start:dev
```

Using Docker
```bash
docker compose up --build --remove-orphans app-dev
```

## Production

> Note: Environment variables are never baked into the image, or they wouldn't be _environment_ variables. The production environment will start a Docker container based on this image, but it will have to pass the environment variables to the container when it runs it.

Example manually running a container with environment variables and ports defined:
Using Docker
```bash
docker compose up --build --remove-orphans app
```
