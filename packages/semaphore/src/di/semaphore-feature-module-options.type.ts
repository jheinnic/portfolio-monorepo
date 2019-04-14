import { DynamicModuleConfigTwo, IBaseConfigProps, IModule } from '@jchptf/nestjs';

import {
   RESERVATION_CHANNEL, RETURN_CHANNEL, SEMAPHORE_RESOURCE_POOL,
   SEMAPHORE_SERVICE, SemaphoreModuleId,
} from './resource-semaphore.constants';

export type SemaphoreFeatureModuleOptions<Consumer extends IModule> =
   DynamicModuleConfigTwo<
      typeof SemaphoreModuleId,
      IBaseConfigProps<Consumer>,
      SemaphoreModuleId,
      typeof SEMAPHORE_RESOURCE_POOL,
      never,
      typeof SEMAPHORE_SERVICE | typeof RESERVATION_CHANNEL | typeof RETURN_CHANNEL
   >;
