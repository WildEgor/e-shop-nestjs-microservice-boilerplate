import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@config/config.module';
import { HealthConfig } from '@config/health.config';
import { HealthModule } from '@modules/health/health.module';
import { DatabaseModule } from '@src/infrastructure/database/database.module';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    DatabaseModule,
    HealthModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: HealthConfig,
    }),
  ],
})
export class AppModule {}
