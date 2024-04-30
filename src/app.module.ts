import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@config/config.module';
import { DatabaseModule } from '@src/infrastructure/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule, CqrsModule],
})
export class AppModule {}
