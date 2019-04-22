import { IAdapter } from '@jchptf/api';
import {
   blessLocalProviderToken, IDynamicModuleBuilder, IModule, LocalProviderToken, MODULE_ID
} from '@jchptf/nestjs';

import { IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory } from './fixtures';
import { SemaphoreFeatureModuleOptions } from '@jchptf/semaphore';
import { DynamicModule } from '@nestjs/common';
import { expandGenericProviders } from '@jchptf/semaphore/dist/di/semaphore.providers';
import { buildDynamicModule } from '../src/builder';

export interface IPair<A, B = A> {
   one: A;
   two: B;
}

export type WrappedPair<A, B = A> = IAdapter<IPair<A, B>>;

export const SEMAPHORE_MODULE_ID = Symbol('@jchptf/semaphore');
export type SEMAPHORE_MODULE_ID = typeof SEMAPHORE_MODULE_ID;

export const SEMAPHORE_FACTORY = Symbol.for('IResourceSemaphoreFactory');

export class SemaphoreModuleId
{
   static readonly [MODULE_ID] = SEMAPHORE_MODULE_ID;

   [SEMAPHORE_FACTORY]: IResourceSemaphoreFactory;
}

export type SemaphoreModuleType = typeof SemaphoreModuleId;
export const foo: IModule = SemaphoreModuleId;

function blessLocal<Token extends keyof SemaphoreModuleId>(
   token: Token,
): LocalProviderToken<SemaphoreModuleId[Token], SemaphoreModuleType, symbol|string>
{
   return blessLocalProviderToken(token, SemaphoreModuleId);
}

export const SEMAPHORE_RESOURCE_POOL = Symbol('Iterable<T>|AsyncIterable<T>');
export const RESERVATION_CHANNEL = Symbol('IAdapter<IPair<IResourceAdapter<T>, T>>');
export const RETURN_CHANNEL = Symbol('IAdapter<IPair<T, IResourceAdapter<T>>>');
export const SEMAPHORE_SERVICE = Symbol('IResourceSemaphore<T>');

export class SemaphoreModuleGeneric<T> {
   [SEMAPHORE_RESOURCE_POOL]: Iterable<T> | AsyncIterable<T>;
   [RESERVATION_CHANNEL]: IAdapter<IPair<IResourceAdapter<T>, T>>;
   [RETURN_CHANNEL]: IAdapter<IPair<T, IResourceAdapter<T>>>;
   [SEMAPHORE_SERVICE]: IResourceSemaphore<T>;
}

export const SEMAPHORE_FACTORY_PROVIDER_TOKEN =
   blessLocal(SEMAPHORE_FACTORY);

export function expandGeneric<T>() {
   function blessGenericLocal<Token extends keyof SemaphoreModuleGeneric<T>>(token: Token):
      LocalProviderToken<SemaphoreModuleGeneric<T>[Token], SemaphoreModuleType, string|symbol>
   {
      return blessLocalProviderToken(token, SemaphoreModuleId);
   }

   return {
      SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN: blessGenericLocal(SEMAPHORE_RESOURCE_POOL),
      SEMAPHORE_SERVICE_PROVIDER_TOKEN: blessGenericLocal(SEMAPHORE_SERVICE),
      RESERVATION_CHANNEL_PROVIDER_TOKEN: blessGenericLocal(RESERVATION_CHANNEL),
      RETURN_CHANNEL_PROVIDER_TOKEN: blessGenericLocal(RETURN_CHANNEL),
   };
}

export class SemaphoreModule extends SemaphoreModuleId
{
   static forFeature<Consumer extends IModule, T = any>(
      options: SemaphoreFeatureModuleOptions<T, Consumer>,
   ): DynamicModule
   {
      const genericTokens = expandGeneric<T>();
      const genericProviders = expandGenericProviders<T>(genericTokens);
      const supplier: IModule = SemaphoreModule;

      return buildDynamicModule(
         supplier,
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
