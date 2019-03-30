import { DynamicModuleConfigTwo, IBaseConfigProps, IModule } from '@jchptf/nestjs';

import {
   RESERVATIONS_CHANNEL, RETURN_CHANNEL, SEMAPHORE_RESOURCE_POOL,
   SEMAPHORE_SERVICE, SemaphoreModuleId,
} from './resource-semaphore.constants';

export type SemaphoreFeatureModuleOptions<T extends {}, Consumer extends IModule> =
   DynamicModuleConfigTwo<
      typeof SemaphoreModuleId,
      IBaseConfigProps<Consumer>,
      SemaphoreModuleId<T>,
      typeof SEMAPHORE_RESOURCE_POOL,
      never,
      typeof SEMAPHORE_SERVICE | typeof RESERVATIONS_CHANNEL | typeof RETURN_CHANNEL
   >;
