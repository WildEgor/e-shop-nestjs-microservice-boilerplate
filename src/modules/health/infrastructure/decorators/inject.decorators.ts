import { Inject } from '@nestjs/common';
import { HealthConstants } from '../types/health.constants';

export const InjectHealthOptions = (): ReturnType<typeof Inject> => Inject(HealthConstants.options);
