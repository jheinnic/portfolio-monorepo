import { Chan } from 'medium';

import { IAdapter } from '@jchptf/api';
import { blessLocalProviderToken, LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';

import { IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory } from '../interfaces';

export const SEMAPHORE_MODULE_ID = Symbol('@jchptf/semaphore');
export type SEMAPHORE_MODULE_ID = typeof SEMAPHORE_MODULE_ID;

export const SEMAPHORE_FACTORY = Symbol('IResourceSemaphoreFactory');
export const SEMAPHORE_RESOURCE_POOL = Symbol('Iterable<T>|AsyncIterable<T>');
export const RESERVATIONS_CHANNEL = Symbol('IAdapter<Chan<IResourceAdapter<T>, T>>');
export const RETURN_CHANNEL = Symbol('IAdapter<Chan<T, IResourceAdapter<T>>>');
export const SEMAPHORE_SERVICE = Symbol('IResourceSemaphore<T>');

export class SemaphoreModuleId<T extends {}>
{
   public static readonly [MODULE_ID]: SEMAPHORE_MODULE_ID;

   [SEMAPHORE_FACTORY]: IResourceSemaphoreFactory;
   [SEMAPHORE_RESOURCE_POOL]: Iterable<T> | AsyncIterable<T>;
   [RESERVATIONS_CHANNEL]: IAdapter<Chan<IResourceAdapter<T>, T>>;
   [RETURN_CHANNEL]: IAdapter<Chan<T, IResourceAdapter<T>>>;
   [SEMAPHORE_SERVICE]: IResourceSemaphore<T>;
}

function blessLocal<T, Token extends keyof SemaphoreModuleId<T>>(
   token: Token,
): LocalProviderToken<SemaphoreModuleId<T>[Token], typeof SemaphoreModuleId, Token>
{
   return blessLocalProviderToken(token, SemaphoreModuleId);
}

export const SEMAPHORE_FACTORY_PROVIDER_TOKEN = blessLocal(SEMAPHORE_FACTORY);
export const SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN = blessLocal(SEMAPHORE_RESOURCE_POOL);
export const SEMAPHORE_SERVICE_PROVIDER_TOKEN = blessLocal(SEMAPHORE_SERVICE);
export const RESERVATION_CHANNEL_PROVIDER_TOKEN = blessLocal(RESERVATIONS_CHANNEL);
export const RETURN_CHANNEL_PROVIDER_TOKEN = blessLocal(RETURN_CHANNEL);

// export const SEMAPHORE_DYNAMIC_MODULE_TYPE =
//    getDynamicModuleKind(SEMAPHORE_MODULE_ID);
