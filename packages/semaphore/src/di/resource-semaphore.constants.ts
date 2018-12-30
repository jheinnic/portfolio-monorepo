import {Chan} from 'medium';

import {
   getDynamicProviderBinding, getGlobalProviderToken, getModuleIdentifier, getNamedTypeIntent,
   TypeIdentifier
} from '@jchptf/api';
import {ResourceAdapter} from '../resource-adapter.class';
import {
   IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory, LoadResourcePoolStrategyConfig
} from '../interfaces';

export const RESOURCE_SEMAPHORE_MODULE_ID =
   getModuleIdentifier("@jchptf/semaphore");

// export const LOAD_RESOURCE_SEMAPHORE_STRATEGY_CONFIGURATION =
//    "LoadResourceSemaphoreStrategyConfiguration";

export const RESOURCE_SEMAPHORE_DYNAMIC_PROVIDER_BINDING =
   getDynamicProviderBinding(RESOURCE_SEMAPHORE_MODULE_ID);

export const LOAD_RESOURCE_STRATEGY_CONFIGURATION_TYPE =
   getNamedTypeIntent<LoadResourcePoolStrategyConfig<any>>("LoadResourcePoolStrategyConfig<T>");

export const RESERVATIONS_CHANNEL_TYPE: TypeIdentifier<Chan<IResourceAdapter<any>, any>> =
   getNamedTypeIntent<Chan<ResourceAdapter<any>, any>>("Chan<_, Outbound>");

export const RESOURCE_RETURN_CHANNEL_TYPE: TypeIdentifier<Chan<any, IResourceAdapter<any>>> =
   getNamedTypeIntent<Chan<any, ResourceAdapter<any>>>("Chan<Inbound, _>");

export const RESOURCE_SEMAPHORE_FACTORY_SERVICE_TYPE =
   getNamedTypeIntent<IResourceSemaphoreFactory>("IResourceSemaphoreFactory");

export const RESOURCE_SEMAPHORE_SERVICE_TYPE =
   getNamedTypeIntent<IResourceSemaphore<any>>("IResourceSemaphore<T>")

export const RESOURCE_SEMAPHORE_FACTORY_SERVICE_PROVIDER =
   getGlobalProviderToken(RESOURCE_SEMAPHORE_FACTORY_SERVICE_TYPE);

// export const RESOURCE_POOL_
// export const _PRIVATE_CHANNEL = "PrivateChannel";
// export const _PRIVATE_ASYNC_SINK = "PrivateAsyncSink";