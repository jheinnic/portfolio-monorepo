import { Chan } from 'medium';

import { IAdapter } from '@jchptf/api';
import { blessLocalProviderToken, LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';

import { IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory } from '../interfaces';

export const SEMAPHORE_MODULE_ID = Symbol('@jchptf/semaphore');
export type SEMAPHORE_MODULE_ID = typeof SEMAPHORE_MODULE_ID;

export const SEMAPHORE_FACTORY = Symbol('IResourceSemaphoreFactory');
export const SEMAPHORE_RESOURCE_POOL = Symbol('Iterable<T>|AsyncIterable<T>');
export const RESERVATION_CHANNEL = Symbol('IAdapter<Chan<IResourceAdapter<T>, T>>');
export const RETURN_CHANNEL = Symbol('IAdapter<Chan<T, IResourceAdapter<T>>>');
export const SEMAPHORE_SERVICE = Symbol('IResourceSemaphore<T>');

export class SemaphoreModuleId
{
   public static readonly [MODULE_ID]: SEMAPHORE_MODULE_ID;

   [SEMAPHORE_FACTORY]: IResourceSemaphoreFactory;
   [SEMAPHORE_RESOURCE_POOL]: Iterable<any> | AsyncIterable<any>;
   [RESERVATION_CHANNEL]: IAdapter<Chan<IResourceAdapter<any>, any>>;
   [RETURN_CHANNEL]: IAdapter<Chan<any, IResourceAdapter<any>>>;
   [SEMAPHORE_SERVICE]: IResourceSemaphore<any>;
}

export type SemaphoreModuleType = typeof SemaphoreModuleId;

function blessLocal<Token extends keyof SemaphoreModuleId>(
   token: Token,
): LocalProviderToken<SemaphoreModuleId[Token], typeof SemaphoreModuleId, Token>
{
   return blessLocalProviderToken(token, SemaphoreModuleId);
}

export const SEMAPHORE_FACTORY_PROVIDER_TOKEN =
   blessLocal(SEMAPHORE_FACTORY);

export const SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN =
   blessLocalProviderToken<Iterable<any> | AsyncIterable<any>, SemaphoreModuleType>(
      SEMAPHORE_RESOURCE_POOL, SemaphoreModuleId);

export const SEMAPHORE_SERVICE_PROVIDER_TOKEN =
   blessLocalProviderToken<IResourceSemaphore<any>, SemaphoreModuleType>(
      SEMAPHORE_SERVICE, SemaphoreModuleId);

export const RESERVATION_CHANNEL_PROVIDER_TOKEN =
   blessLocalProviderToken<
      IAdapter<Chan<IResourceAdapter<any>, any>>, SemaphoreModuleType>(
         RESERVATION_CHANNEL, SemaphoreModuleId);

export const RETURN_CHANNEL_PROVIDER_TOKEN =
   blessLocalProviderToken<
      IAdapter<Chan<any, IResourceAdapter<any>>>, SemaphoreModuleType>(
         RETURN_CHANNEL, SemaphoreModuleId);

// export const SEMAPHORE_DYNAMIC_MODULE_TYPE =
//    getDynamicModuleKind(SEMAPHORE_MODULE_ID);
