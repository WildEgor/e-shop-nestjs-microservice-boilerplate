import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from '@config/app.config';
import { AppModule } from './app.module';

const bootstrap = async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
      bodyLimit: 10048576,
    }),
  );
  const appConfig = app.get(AppConfig);
  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const logger = new Logger(bootstrap.name);

  if (!appConfig.isProduction) {
    const config = new DocumentBuilder()
      .setTitle('NestJS microservices')
      .setDescription('A part of service eShop')
      .setVersion('1.0')
      .addTag('doc.json')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT Authorization',
          description: 'Enter JWT access token for authorized requests.',
          in: 'header',
        },
        'JWT Token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup('/api/docs', app, document);
  }
  else {
    app.use((_req, res, next) => {
      res.removeHeader('X-Powered-By');
      next();
    });
  }

  await app.listen(appConfig.port, '0.0.0.0', () => {
    const baseUrl = process.platform === 'win32' ? 'http://localhost' : 'http://127.0.0.1';
    logger.debug(`Service (HTTP) available at ${baseUrl}:${appConfig.port}`);
    logger.debug(`Service (GRPC) available at ${baseUrl}:${appConfig.gRPCPort}`);
    logger.debug(`Swagger available at ${baseUrl}:${appConfig.port}/api/docs`);
  });
};
bootstrap().catch((e) => {
  throw e;
});
