// <reference file="../../typings/medium/index.d.ts">
import { DynamicModule, Module } from '@nestjs/common';

import { buildDynamicModule, IDynamicModuleBuilder, IModule } from '@jchptf/nestjs';
import { CoroutinesModule } from '@jchptf/coroutines';

import { ResourceSemaphoreFactory } from '../resource-semaphore-factory.class';

import {
   RESERVATION_CHANNEL, RETURN_CHANNEL, SEMAPHORE_FACTORY_PROVIDER_TOKEN, SEMAPHORE_RESOURCE_POOL,
   SEMAPHORE_SERVICE, SemaphoreModuleId, expandGeneric,
} from './resource-semaphore.constants';
import { SemaphoreFeatureModuleOptions } from './semaphore-feature-module-options.type';
import { expandGenericProviders } from './semaphore.providers';

@Module({
   imports: [CoroutinesModule],
   providers: [
      {
         provide: SEMAPHORE_FACTORY_PROVIDER_TOKEN,
         useClass: ResourceSemaphoreFactory,
      },
   ],
})
export class SemaphoreModule extends SemaphoreModuleId
{
   public static forFeature<Consumer extends IModule, T = any>(
      options: SemaphoreFeatureModuleOptions<T, Consumer>,
   ): DynamicModule
   {
      const genericTokens = expandGeneric<T>();
      const genericProviders = expandGenericProviders<T>(genericTokens);

      return buildDynamicModule(
         SemaphoreModule,
         options.forModule,
         (builder: IDynamicModuleBuilder<typeof SemaphoreModuleId, Consumer>): void => {
            builder.acceptBoundImport(options[SEMAPHORE_RESOURCE_POOL]);

            const serviceToken = options[SEMAPHORE_SERVICE];
            const reservationsToken = options[RESERVATION_CHANNEL];
            const returnsToken = options[RETURN_CHANNEL];

            if (!! (serviceToken || reservationsToken || returnsToken)) {
               builder.acceptBoundImport(genericProviders.SEMAPHORE_SERVICE_PROVIDER);
            }

            if (!!serviceToken) {
               builder.exportFromSupplier(
                  serviceToken, genericTokens.SEMAPHORE_SERVICE_PROVIDER_TOKEN);
            }

            if (!!reservationsToken) {
               builder
                  .acceptBoundImport(genericProviders.RESERVATION_CHANNEL_PROVIDER)
                  .exportFromSupplier(
                     reservationsToken, genericTokens.RESERVATION_CHANNEL_PROVIDER_TOKEN);
            }

            if (!!returnsToken) {
               builder
                  .acceptBoundImport(genericProviders.RETURN_CHANNEL_PROVIDER)
                  .exportFromSupplier(
                     returnsToken, genericTokens.RETURN_CHANNEL_PROVIDER_TOKEN);
            }
         },
      );
   }
}
