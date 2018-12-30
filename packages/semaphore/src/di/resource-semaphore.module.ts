import {DynamicModule, Module} from '@nestjs/common';
import {Chan} from 'medium';

import {ModuleIdentifier} from '@jchptf/api';
import {CoroutinesModule} from '@jchptf/coroutines';
import {RESOURCE_SEMAPHORE_FACTORY_SERVICE_PROVIDER} from './resource-semaphore.constants';
import {
   getReservationChannelToken, getResourceReturnChannelToken, getResourceSemaphoreOptionsToken,
   getResourceSemaphoreToken
} from './resource-semaphore.utilities';
import {ResourceSemaphoreFactory} from '../resource-semaphore-factory.class';
import {IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory, LoadResourcePoolStrategyConfig} from '../interfaces';

@Module({})
export class ResourceSemaphoreModule
{
   public static forRoot<T extends object>(moduleId: ModuleIdentifier, config: LoadResourcePoolStrategyConfig<T>): DynamicModule
   {
      const configToken = getResourceSemaphoreOptionsToken(moduleId, config);

      const resourceSemaphoreConfiguration = {
         provide: configToken,
         useValue: config,
      };

      // TODO: Migrate to a global import
      const resourceSemaphoreFactoryProvider = {
         provide: RESOURCE_SEMAPHORE_FACTORY_SERVICE_PROVIDER,
         useClass: ResourceSemaphoreFactory
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
         inject: [ RESOURCE_SEMAPHORE_FACTORY_SERVICE_PROVIDER, configToken ]
      };

      const semaphoreReservationsProvider = {
         provide: getReservationChannelToken(moduleId, config),
         useFactory: <T extends object>(sem: IResourceSemaphore<T>): Chan<IResourceAdapter<T>, T> =>
         {
            return sem.getReservationChan();
         },
         inject: [resourceSemaphoreToken]
      };

      const semaphoreReturnsProvider = {
         provide: getResourceReturnChannelToken(moduleId, config),
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
//     // TODO: Migrate the global semaphore factory class here!
// }