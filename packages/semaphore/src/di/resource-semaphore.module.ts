/// <reference file="../../typings/medium/index.d.ts">
import { DynamicModule, Module } from '@nestjs/common';
import { Chan } from 'medium';

import { IAdapter, ModuleIdentifier } from '@jchptf/api';
import { CoroutinesModule } from '@jchptf/coroutines';
import { RESOURCE_SEMAPHORE_FACTORY_SERVICE_PROVIDER } from './resource-semaphore.constants';
import {
   getReservationChannelToken, getResourceReturnChannelToken, getResourceSemaphoreOptionsToken,
   getResourceSemaphoreToken,
} from './resource-semaphore.utilities';
import { ResourceSemaphoreFactory } from '../resource-semaphore-factory.class';
import {
   IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory, LoadResourcePoolStrategyConfig,
} from '../interfaces';

@Module({})
export class ResourceSemaphoreModule
{
   public static forRoot<T extends object>(
      moduleId: ModuleIdentifier, config: LoadResourcePoolStrategyConfig<T>): DynamicModule
   {
      const configToken = getResourceSemaphoreOptionsToken(moduleId, config);

      const resourceSemaphoreConfiguration = {
         provide: configToken,
         useValue: config,
      };

      // TODO: Migrate to a global import
      const resourceSemaphoreFactoryProvider = {
         provide: RESOURCE_SEMAPHORE_FACTORY_SERVICE_PROVIDER,
         useClass: ResourceSemaphoreFactory,
      };

      const resourceSemaphoreToken = getResourceSemaphoreToken<T>(moduleId, config);

      const resourceSemaphoreProvider = {
         provide: resourceSemaphoreToken,
         useFactory: async (
            semaphoreFactory: IResourceSemaphoreFactory,
            config: LoadResourcePoolStrategyConfig<T>): Promise<IResourceSemaphore<T>> =>
         {
            return await semaphoreFactory.createSemaphore(config);
         },
         inject: [RESOURCE_SEMAPHORE_FACTORY_SERVICE_PROVIDER, configToken],
      };

      const semaphoreReservationsProvider = {
         provide: getReservationChannelToken(moduleId, config),
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
         provide: getResourceReturnChannelToken(moduleId, config),
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
            resourceSemaphoreFactoryProvider,
            resourceSemaphoreProvider,
            resourceSemaphoreConfiguration,
            semaphoreReservationsProvider,
            semaphoreReturnsProvider,
         ],
         exports: [
            resourceSemaphoreProvider, semaphoreReservationsProvider, semaphoreReturnsProvider,
         ],
      };
   }
}

// @Global()
// @Module({})
// class GlobalResourcePoolModule
// {
//     // TODO: Migrate the global semaphore factory class here!
// }
