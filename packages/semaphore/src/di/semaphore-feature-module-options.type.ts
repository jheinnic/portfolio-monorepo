import { DynamicModuleConfigTwo, IBaseConfigProps, IModule } from '@jchptf/nestjs';

import {
   RESERVATION_CHANNEL, RETURN_CHANNEL, SEMAPHORE_RESOURCE_POOL,
   SEMAPHORE_SERVICE, SemaphoreModuleGeneric, SemaphoreModuleId,
} from './resource-semaphore.constants';

export type SemaphoreFeatureModuleOptions<T, Consumer extends IModule> =
   DynamicModuleConfigTwo<
      typeof SemaphoreModuleId,
      IBaseConfigProps<Consumer>,
      SemaphoreModuleId & SemaphoreModuleGeneric<T>,
      typeof SEMAPHORE_RESOURCE_POOL,
      never,
      typeof SEMAPHORE_SERVICE | typeof RESERVATION_CHANNEL | typeof RETURN_CHANNEL
   >;
