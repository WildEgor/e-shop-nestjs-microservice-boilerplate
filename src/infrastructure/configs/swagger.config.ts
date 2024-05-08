import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';
import { AppConfig } from './app.config';

@Injectable()
export class SwaggerConfig {

  private readonly title: string;
  public readonly path: string;
  public readonly url: string;

  constructor(
    configService: ConfigService,
    appConfig: AppConfig,
  ) {
    this.path = configService.get('SWAGGER_PATH');
    this.url = appConfig.host + this.path;
    this.title = `${appConfig.name} - Service`;
  }

  public get cfg(): Omit<OpenAPIObject, 'paths'> {
    return new DocumentBuilder()
      .setTitle(this.title)
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
  }

}
