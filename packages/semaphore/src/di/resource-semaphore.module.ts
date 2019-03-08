/// <reference file="../../typings/medium/index.d.ts">
import { DynamicModule, Module } from '@nestjs/common';
import { Chan } from 'medium';

import { IAdapter } from '@jchptf/api';
import { AsyncModuleParam, asyncProviderFromParam, ModuleIdentifier } from '@jchptf/nestjs';
import { CoroutinesModule } from '@jchptf/coroutines';

import {
   SEMAPHORE_FACTORY_PROVIDER_TOKEN, SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN
} from './resource-semaphore.constants';
import {
   getReservationChannelToken, getResourceReturnChannelToken, getResourceSemaphoreToken,
} from './resource-semaphore.utilities';
import { ResourceSemaphoreFactory } from '../resource-semaphore-factory.class';
import {
   IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory,
} from '../interfaces';

@Module({
   imports: [CoroutinesModule],
   providers: [
      {
         provide: SEMAPHORE_FACTORY_PROVIDER_TOKEN,
         useClass: ResourceSemaphoreFactory,
      }
   ]
})
export class ResourceSemaphoreModule
{
   public static forFeature<T extends object>(
      moduleId: ModuleIdentifier,
      config: AsyncModuleParam<Iterable<T>|AsyncIterable<T>>,
      instanceTag?: string
   ): DynamicModule
   {
      const resourcePoolProvider =
         asyncProviderFromParam(SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN, config);

      const resourceSemaphoreToken =
         getResourceSemaphoreToken<T>(moduleId, instanceTag);

      const resourceSemaphoreProvider = {
         provide: resourceSemaphoreToken,
         useFactory: async (
            semaphoreFactory: IResourceSemaphoreFactory,
            resourcePool: Iterable<T>|AsyncIterable<T>): Promise<IResourceSemaphore<T>> =>
         {
            return await semaphoreFactory.createSemaphore(resourcePool);
         },
         inject: [SEMAPHORE_FACTORY_PROVIDER_TOKEN, SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN],
      };

      const semaphoreReservationsProvider = {
         provide: getReservationChannelToken(moduleId, instanceTag),
         useFactory: <T extends object>(sem: IResourceSemaphore<T>): IAdapter<Chan<IResourceAdapter<T>, T>> =>
         {
            const unwrapValue = sem.getReservationChan();
            return {
               unwrap() { return unwrapValue; },
            };
         },
         inject: [resourceSemaphoreToken],
      };

      const semaphoreReturnsProvider = {
         provide: getResourceReturnChannelToken(moduleId, instanceTag),
         useFactory: <T extends object>(sem: IResourceSemaphore<T>): IAdapter<Chan<T, IResourceAdapter<T>>> =>
         {
            const unwrapValue = sem.getReturnChan();
            return {
               unwrap() { return unwrapValue; },
            };
         },
         inject: [resourceSemaphoreToken],
      };

      return {
         module: ResourceSemaphoreModule,
         imports: [CoroutinesModule],
         providers: [
            ...resourcePoolProvider,
            resourceSemaphoreProvider,
            semaphoreReservationsProvider,
            semaphoreReturnsProvider,
         ],
         exports: [
            ...resourcePoolProvider,
            resourceSemaphoreProvider,
            semaphoreReservationsProvider,
            semaphoreReturnsProvider,
         ],
      };
   }
}
