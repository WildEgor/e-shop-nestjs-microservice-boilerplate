import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from '@config/app.config';
import { SwaggerConfig } from '@config/swagger.config';
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
  const swaggerConfig = app.get(SwaggerConfig);

  app.enableCors({
    origin: '*',
  });
  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use((_req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  });

  const logger = new Logger(bootstrap.name);

  if (!appConfig.isProduction) {
    const document = SwaggerModule.createDocument(app, swaggerConfig.cfg, {
      ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup(
      swaggerConfig.path,
      app,
      document,
      {
        swaggerOptions: {
          persistAuthorization: true,
        },
      },
    );
  }

  await app.listen(appConfig.port, '0.0.0.0', () => {
    logger.debug(`REST API available at ${appConfig.host}`);
    logger.debug(`SwaggerUI available at ${swaggerConfig.url}`);
  });
};
bootstrap().catch((e) => {
  throw e;
});
