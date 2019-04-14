// <reference file="../../typings/medium/index.d.ts">
import { DynamicModule, Module } from '@nestjs/common';

import { buildDynamicModule, IDynamicModuleBuilder, IModule } from '@jchptf/nestjs';
import { CoroutinesModule } from '@jchptf/coroutines';

import { ResourceSemaphoreFactory } from '../resource-semaphore-factory.class';

import {
   RESERVATION_CHANNEL_PROVIDER_TOKEN, RESERVATIONS_CHANNEL, RETURN_CHANNEL,
   RETURN_CHANNEL_PROVIDER_TOKEN, SEMAPHORE_FACTORY_PROVIDER_TOKEN, SEMAPHORE_RESOURCE_POOL,
   SEMAPHORE_SERVICE, SEMAPHORE_SERVICE_PROVIDER_TOKEN, SemaphoreModuleId,
} from './resource-semaphore.constants';
import { SemaphoreFeatureModuleOptions } from './semaphore-feature-module-options.type';
import { SEMAPHORE_SERVICE_PROVIDER } from './semaphore-service.provider';
import { RESERVATION_CHANNEL_PROVIDER } from './reservation-channel.provider';
import { RETURN_CHANNEL_PROVIDER } from './return-channel.provider';

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
   public static forFeature<Consumer extends IModule>(
      options: SemaphoreFeatureModuleOptions<Consumer>,
   ): DynamicModule
   {
      return buildDynamicModule(
         SemaphoreModule,
         options.forModule,
         (builder: IDynamicModuleBuilder<typeof SemaphoreModuleId, Consumer>): void => {
            builder.acceptBoundImport(options[SEMAPHORE_RESOURCE_POOL]);

            const serviceToken = options[SEMAPHORE_SERVICE];
            const reservationsToken = options[RESERVATIONS_CHANNEL];
            const returnsToken = options[RETURN_CHANNEL];

            if (!! (serviceToken || reservationsToken || returnsToken)) {
               builder.acceptBoundImport(SEMAPHORE_SERVICE_PROVIDER);
            }

            if (!!serviceToken) {
               builder.exportFromSupplier(serviceToken, SEMAPHORE_SERVICE_PROVIDER_TOKEN);
            }

            if (!!reservationsToken) {
               builder
                  .acceptBoundImport(RESERVATION_CHANNEL_PROVIDER)
                  .exportFromSupplier(reservationsToken, RESERVATION_CHANNEL_PROVIDER_TOKEN);
            }

            if (!!returnsToken) {
               builder
                  .acceptBoundImport(RETURN_CHANNEL_PROVIDER)
                  .exportFromSupplier(returnsToken, RETURN_CHANNEL_PROVIDER_TOKEN);
            }
         },
      );
   }
}
