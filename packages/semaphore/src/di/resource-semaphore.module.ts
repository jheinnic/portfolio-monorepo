import {DynamicModule, Module} from '@nestjs/common';
import {Chan} from 'medium';

import {CoroutinesModule} from '@jchptf/coroutines';
import {
   LOAD_RESOURCE_SEMAPHORE_STRATEGY_CONFIGURATION, RESOURCE_SEMAPHORE_FACTORY_SERVICE
} from './resource-semaphore.constants';
import {
   getReservationChannelToken, getResourceReturnChannelToken, getResourceSemaphoreToken
} from './resource-semaphore.utilities';
import {ResourceSemaphoreFactory} from '../resource-semaphore-factory.class';
import {IResourceSemaphore, IResourceSemaphoreFactory, LoadResourcePoolStrategyConfig} from '../interfaces';
import {IResourceAdapter} from '../interfaces';

@Module({})
export class ResourceSemaphoreModule
{
   public static forRoot<T extends object>(config: LoadResourcePoolStrategyConfig<T>): DynamicModule
   {
      const resourceSemaphoreConfiguration = {
         provide: LOAD_RESOURCE_SEMAPHORE_STRATEGY_CONFIGURATION,
         useValue: config,
      };

      const resourceSemaphoreFactoryProvider = {
         provide: RESOURCE_SEMAPHORE_FACTORY_SERVICE,
         useClass: ResourceSemaphoreFactory
         // useFactory: async (concurrentWorkFactory: IConcurrentWorkFactory) =>
         //    new ResourceSemaphoreFactory(concurrentWorkFactory)
         // inject: [ConcurrentWorkFactory]
      };

      const resourceSemaphoreToken = getResourceSemaphoreToken<T>(config);

      const resourceSemaphoreProvider = {
         provide: resourceSemaphoreToken,
         useFactory: async (
            semaphoreFactory: IResourceSemaphoreFactory,
            config: LoadResourcePoolStrategyConfig<T>): Promise<IResourceSemaphore<T>> =>
         {
            return await semaphoreFactory.createSemaphore(config);
         },
         inject: [
            RESOURCE_SEMAPHORE_FACTORY_SERVICE,
            LOAD_RESOURCE_SEMAPHORE_STRATEGY_CONFIGURATION
         ]
      };

      const semaphoreReservationsProvider = {
         provide: getReservationChannelToken(config),
         useFactory: <T extends object>(sem: IResourceSemaphore<T>): Chan<IResourceAdapter<T>, T> =>
         {
            return sem.getReservationChan();
         },
         inject: [resourceSemaphoreToken]
      };

      const semaphoreReturnsProvider = {
         provide: getResourceReturnChannelToken(config),
         useFactory: <T extends object>(sem: IResourceSemaphore<T>): Chan<T, IResourceAdapter<T>> =>
         {
            return sem.getReturnChan();
         },
         inject: [resourceSemaphoreToken]
      }

      return {
         module: ResourceSemaphoreModule,
         imports: [CoroutinesModule],
         providers: [
            resourceSemaphoreFactoryProvider,
            resourceSemaphoreProvider,
            resourceSemaphoreConfiguration,
            semaphoreReservationsProvider,
            semaphoreReturnsProvider
         ],
         exports: [resourceSemaphoreProvider],
      };
   }
}

// @Global()
// @Module({})
// class GlobalResourcePoolModule
// {
//
// }