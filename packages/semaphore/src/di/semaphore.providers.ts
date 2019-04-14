import { Chan } from 'medium';

import { IAdapter } from '@jchptf/api';

import { expandGeneric, SEMAPHORE_FACTORY_PROVIDER_TOKEN } from './resource-semaphore.constants';
import { DynamicProviderBindingStyle } from '@jchptf/nestjs';
import { IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory } from '../interfaces';

export function expandGenericProviders<T>(tokens: ReturnType<typeof expandGeneric>)
{
   return {
      SEMAPHORE_SERVICE_PROVIDER: {
         style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION as
            DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION,
         provide: tokens.SEMAPHORE_SERVICE_PROVIDER_TOKEN,
         useFactory: async <T extends object>(
            semaphoreFactory: IResourceSemaphoreFactory,
            resourcePool: Iterable<T> | AsyncIterable<T>,
         ): Promise<IResourceSemaphore<{}>> =>
            await semaphoreFactory.createSemaphore(resourcePool),
         inject: [SEMAPHORE_FACTORY_PROVIDER_TOKEN, tokens.SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN],
      },
      RESERVATION_CHANNEL_PROVIDER: {
         style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION as
            DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION,
         provide: tokens.RESERVATION_CHANNEL_PROVIDER_TOKEN,
         useFactory: (sem: IResourceSemaphore<T>):
            IAdapter<Chan<IResourceAdapter<T>, T>> =>
         {
            const unwrapValue = sem.getReservationChan();
            return {
               unwrap() { return unwrapValue; },
            };
         },
         inject: [tokens.SEMAPHORE_SERVICE_PROVIDER_TOKEN],
      },
      RETURN_CHANNEL_PROVIDER: {
         style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION as
            DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION,
         provide: tokens.RETURN_CHANNEL_PROVIDER_TOKEN,
         useFactory: (sem: IResourceSemaphore<T>):
            IAdapter<Chan<T, IResourceAdapter<T>>> =>
         {
            const unwrapValue = sem.getReturnChan();
            return {
               unwrap() { return unwrapValue; },
            };
         },
         inject: [tokens.SEMAPHORE_SERVICE_PROVIDER_TOKEN],
      },
   };
}
