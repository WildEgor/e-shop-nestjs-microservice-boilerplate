import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { IHealthConfigFactory, IHealthModuleAsyncOptions, IHealthModuleOptions } from '@modules/health/infrastructure/interfaces/module.interfaces';
import { HealthController } from './application/health.controller';
import { HealthIndicator } from './infrastructure/services/health.indicator';
import { HealthService } from './infrastructure/services/health.service';
import { HealthConstants } from './infrastructure/types/health.constants';

@Module({
  imports: [TerminusModule],
  providers: [HealthService, HealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {

  public static forRootAsync(asyncOptions: IHealthModuleAsyncOptions): DynamicModule {
    const HealthOptionsProvider: FactoryProvider<IHealthModuleOptions> = {
      provide: HealthConstants.options,
      useFactory: async(factory: IHealthConfigFactory) => {
        const options = await factory.createHealthConfig();
        return options;
      },
      inject: [asyncOptions.useExisting],
    };

    return {
      module: HealthModule,
      imports: asyncOptions.imports,
      providers: [
        HealthOptionsProvider,
        HealthService,
        HealthIndicator,
      ],
      exports: [
        HealthOptionsProvider,
        HealthService,
        HealthIndicator,
      ],
    };
  }

}
