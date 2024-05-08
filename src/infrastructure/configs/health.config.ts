import { Injectable } from '@nestjs/common';
import { THealthIndicatorResult } from '@modules/health/infrastructure/interfaces/indicator.interfaces';
import { IHealthConfigFactory, IHealthModuleOptions } from '@modules/health/infrastructure/interfaces/module.interfaces';
import { AppConfig } from './app.config';

@Injectable()
export class HealthConfig implements IHealthConfigFactory {

  private readonly opts: IHealthModuleOptions;

  constructor(
    appConfig: AppConfig,
  ) {
    this.opts = {
      name: appConfig.name,
      indicators: [(): THealthIndicatorResult => ({
        ping: {
          status: 'up',
        },
      })],
    };
  }

  createHealthConfig(): IHealthModuleOptions | Promise<IHealthModuleOptions> {
    return this.opts;
  }

}
