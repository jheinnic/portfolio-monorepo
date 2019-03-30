import { DynamicProviderBindingStyle } from '@jchptf/nestjs';
import { SEMAPHORE_FACTORY_PROVIDER_TOKEN } from './resource-semaphore.constants';
import { ResourceSemaphoreFactory } from '../resource-semaphore-factory.class';

export const SEMAPHORE_FACTORY_PROVIDER = {
   style: DynamicProviderBindingStyle.CLASS,
   provide: SEMAPHORE_FACTORY_PROVIDER_TOKEN,
   useClass: ResourceSemaphoreFactory,
};
