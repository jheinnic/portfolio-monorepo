import {Chan} from 'medium';

import {
   getDynamicProviderBinding, getLocalProviderToken, getModuleIdentifier,
   getNamedTypeIntent, NAMED_EITHER_ITERABLE_ANY_TYPE,
   TypeIdentifier
} from '@jchptf/nestjs';
import {ResourceAdapter} from '../resource-adapter.class';
import {
   IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory
} from '../interfaces';

export const SEMAPHORE_MODULE_ID =
   getModuleIdentifier("@jchptf/semaphore");

export const SEMAPHORE_FACTORY_SERVICE_TYPE =
   getNamedTypeIntent<IResourceSemaphoreFactory>("IResourceSemaphoreFactory");

export const SEMAPHORE_FACTORY_PROVIDER_TOKEN =
   getLocalProviderToken(SEMAPHORE_MODULE_ID, SEMAPHORE_FACTORY_SERVICE_TYPE);

export const SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN =
   getLocalProviderToken(SEMAPHORE_MODULE_ID, NAMED_EITHER_ITERABLE_ANY_TYPE);

export const RESERVATIONS_CHANNEL_TYPE: TypeIdentifier<Chan<IResourceAdapter<any>, any>> =
   getNamedTypeIntent<Chan<ResourceAdapter<any>, any>>("Chan<ResourceAdapter<T>, T>");

export const RETURN_CHANNEL_TYPE: TypeIdentifier<Chan<any, IResourceAdapter<any>>> =
   getNamedTypeIntent<Chan<any, ResourceAdapter<any>>>("Chan<T, ResourceAdapter<T>>");

export const SEMAPHORE_SERVICE_TYPE =
   getNamedTypeIntent<IResourceSemaphore<any>>("IResourceSemaphore<T>")

export const SEMAPHORE_DYNAMIC_PROVIDER_BINDING =
   getDynamicProviderBinding(SEMAPHORE_MODULE_ID);
