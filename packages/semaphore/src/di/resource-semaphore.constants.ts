import { Chan } from 'medium';

import { IAdapter } from '@jchptf/api';
import { blessLocalProviderToken, LocalProviderToken } from '@jchptf/nestjs';

import { IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory } from '../interfaces';

export const SEMAPHORE_MODULE_ID = Symbol('@jchptf/semaphore');
export type SEMAPHORE_MODULE_ID = typeof SEMAPHORE_MODULE_ID;

export const SEMAPHORE_FACTORY = Symbol('IResourceSemaphoreFactory');
export const SEMAPHORE_RESOURCE_POOL = Symbol('Iterable<any>|AsyncIterable<any>');
export const RESERVATIONS_CHANNEL = Symbol('IAdapter<Chan<IResourceAdapter<any>, any>>');
export const RETURN_CHANNEL = Symbol('IAdapter<Chan<any, IResourceAdapter<any>>>');
export const SEMAPHORE_SERVICE = Symbol('IResourceSemaphore<any>');

export interface ISemaphoreModuleTokens
{
   [SEMAPHORE_FACTORY]: IResourceSemaphoreFactory;
   [SEMAPHORE_RESOURCE_POOL]: Iterable<any> | AsyncIterable<any>;
   [RESERVATIONS_CHANNEL]: IAdapter<Chan<IResourceAdapter<any>, any>>;
   [RETURN_CHANNEL]: IAdapter<Chan<any, IResourceAdapter<any>>>;
   [SEMAPHORE_SERVICE]: IResourceSemaphore<any>;
}

function blessLocal<Token extends keyof ISemaphoreModuleTokens>(
   token: Token,
): LocalProviderToken<ISemaphoreModuleTokens[Token], SEMAPHORE_MODULE_ID, Token>
{
   return blessLocalProviderToken(token);
}

export const SEMAPHORE_FACTORY_PROVIDER_TOKEN = blessLocal(SEMAPHORE_FACTORY);
export const SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN = blessLocal(SEMAPHORE_RESOURCE_POOL);
export const SEMAPHORE_SERVICE_PROVIDER_TOKEN = blessLocal(SEMAPHORE_SERVICE);
export const RESERVATIONS_CHANNEL_PROVIDER_TOKEN = blessLocal(RESERVATIONS_CHANNEL);
export const RETURN_CHANNEL_PROVIDER_TOKEN = blessLocal(RETURN_CHANNEL);

// export const SEMAPHORE_DYNAMIC_MODULE_TYPE =
//    getDynamicModuleKind(SEMAPHORE_MODULE_ID);
