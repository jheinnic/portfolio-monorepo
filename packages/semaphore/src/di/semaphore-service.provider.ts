import { DynamicProviderBindingStyle, IBySupplierFactoryCall } from '@jchptf/nestjs';

import { IResourceSemaphore, IResourceSemaphoreFactory } from '../interfaces';

import {
   SEMAPHORE_FACTORY_PROVIDER_TOKEN, SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN,
   SEMAPHORE_SERVICE_PROVIDER_TOKEN, SemaphoreModuleId,
} from './resource-semaphore.constants';

export const SEMAPHORE_SERVICE_PROVIDER:
   IBySupplierFactoryCall<
      any, typeof SemaphoreModuleId, any,
      (
         semaphoreFactory: IResourceSemaphoreFactory,
         resourcePool: Iterable<any> | AsyncIterable<any>,
      ) => Promise<IResourceSemaphore<any>>
   > = {
      style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION,
      provide: SEMAPHORE_SERVICE_PROVIDER_TOKEN,
      useFactory: async <T extends {}>(
         semaphoreFactory: IResourceSemaphoreFactory,
         resourcePool: Iterable<T> | AsyncIterable<T>,
      ): Promise<IResourceSemaphore<T>> =>
         await semaphoreFactory.createSemaphore(resourcePool),
      inject: [SEMAPHORE_FACTORY_PROVIDER_TOKEN, SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN],
   };
