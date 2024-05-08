import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { HealthConfig } from '@config/health.config';
import { SwaggerConfig } from '@config/swagger.config';
import { AppConfig } from './app.config';

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: [
        '.env',
        '.env.local',
        // '.env.example',
      ],
    }),
  ],
  providers: [
    NestConfig.ConfigService,
    ConfigService,
    AppConfig,
    HealthConfig,
    SwaggerConfig,
  ],
  exports: [
    AppConfig,
    HealthConfig,
    SwaggerConfig,
  ],
})
export class ConfigModule {}
