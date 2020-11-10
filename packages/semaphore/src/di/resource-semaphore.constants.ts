import { Chan } from 'medium';

import { IAdapter } from '@jchptf/api';
import { prepareModule, blessLocalProviderToken, LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';

import { IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory } from '../interfaces';

export const SEMAPHORE_MODULE_ID = Symbol('@jchptf/semaphore');
export type SEMAPHORE_MODULE_ID = typeof SEMAPHORE_MODULE_ID;

export const SEMAPHORE_FACTORY = Symbol('IResourceSemaphoreFactory');

export class SemaphoreModuleId
{
   public static readonly [MODULE_ID]: SEMAPHORE_MODULE_ID;

   [SEMAPHORE_FACTORY]: IResourceSemaphoreFactory;
}

export type SemaphoreModuleType = typeof SemaphoreModuleId;

// function blessLocal<Token extends keyof SemaphoreModuleId>(
//    token: Token,
// ): LocalProviderToken<SemaphoreModuleId[Token], SemaphoreModuleType, Token>
// {
//    return blessLocalProviderToken(token, SemaphoreModuleId);
// }
const blessLocal = prepapreModule(SEMAPHORE_MODULE_ID);

export const SEMAPHORE_RESOURCE_POOL = Symbol('Iterable<T>|AsyncIterable<T>');
export const RESERVATION_CHANNEL = Symbol('IAdapter<Chan<IResourceAdapter<T>, T>>');
export const RETURN_CHANNEL = Symbol('IAdapter<Chan<T, IResourceAdapter<T>>>');
export const SEMAPHORE_SERVICE = Symbol('IResourceSemaphore<T>');

export class SemaphoreModuleGeneric<T> {
   [SEMAPHORE_RESOURCE_POOL]: Iterable<T> | AsyncIterable<T>;
   [RESERVATION_CHANNEL]: IAdapter<Chan<IResourceAdapter<T>, T>>;
   [RETURN_CHANNEL]: IAdapter<Chan<T, IResourceAdapter<T>>>;
   [SEMAPHORE_SERVICE]: IResourceSemaphore<T>;
}

export const SEMAPHORE_FACTORY_PROVIDER_TOKEN =
   blessLocal(SEMAPHORE_FACTORY);

export function expandGeneric<T>() {
   function blessGenericLocal<Token extends keyof SemaphoreModuleGeneric<T>>(token: Token):
      LocalProviderToken<SemaphoreModuleGeneric<T>[Token], SemaphoreModuleType, Token>
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

// export const SEMAPHORE_DYNAMIC_MODULE_TYPE =
//    getDynamicModuleKind(SEMAPHORE_MODULE_ID);
