import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './app.config';

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local', '.env.example'],
    }),
  ],
  providers: [
    NestConfig.ConfigService,
    ConfigService,
    AppConfig,
  ],
  exports: [
    AppConfig,
  ],
})
export class ConfigModule {}
