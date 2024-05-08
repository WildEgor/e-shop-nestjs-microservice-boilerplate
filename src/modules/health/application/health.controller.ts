import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiHealth } from '@modules/health/infrastructure/decorators/health.decorator';
import { ApiReadiness } from '@modules/health/infrastructure/decorators/readiness.decorator';
import { IHealthCheckResult } from '@modules/health/infrastructure/interfaces/indicator.interfaces';
import { HealthService } from '../infrastructure/services/health.service';

@ApiTags('Health Controller')
@Controller()
export class HealthController {

  constructor(
    private readonly service: HealthService,
  ) {
    this.service = service;
  }

  @ApiHealth()
  @Get('health/livez')
  // eslint-disable-next-line no-empty-function
  public ping(): void {
  }

  @ApiReadiness()
  @Get('health/readyz')
  public async readiness(): Promise<IHealthCheckResult> {
    const result = await this.service.check();
    return result;
  }

}
