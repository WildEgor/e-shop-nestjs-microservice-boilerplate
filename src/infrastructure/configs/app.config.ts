import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {

  public readonly name: string;
  public readonly port: number;
  public readonly isProduction: boolean;
  public readonly gRPCPort: number;
  public readonly sha: string;

  constructor(configService: ConfigService) {
    this.name = configService.get('APP_NAME');
    this.port = configService.get('APP_PORT');
    this.isProduction = configService.get('APP_MODE') !== 'develop';
    this.gRPCPort = configService.get('GRPC_PORT');
  }

}
