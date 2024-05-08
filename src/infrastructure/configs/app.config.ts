import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {

  public readonly name: string;
  public readonly port: number;
  private readonly mode: string;

  constructor(configService: ConfigService) {
    this.name = configService.get('APP_NAME');
    this.port = configService.get('APP_PORT');
    this.mode = configService.get('APP_MODE');
  }

  public get isProduction(): boolean {
    return this.mode !== 'develop';
  }

  public get host(): string {
    return process.platform === 'win32'
      ? `http://localhost:${this.port}`
      : `http://127.0.0.1:${this.port}`;
  }

}
