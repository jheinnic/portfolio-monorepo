import {Chan} from 'medium';

import {
   getDynamicModuleType, getLocalProviderToken, getModuleIdentifier,
   getNamedTypeIntent, NAMED_EITHER_ITERABLE_ANY_TYPE, TypeIdentifier
} from '@jchptf/nestjs';
import { IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory } from '../interfaces';

export const SEMAPHORE_MODULE_ID =
   getModuleIdentifier("@jchptf/semaphore");

export const SEMAPHORE_FACTORY_SERVICE_TYPE =
   getNamedTypeIntent<IResourceSemaphoreFactory>("IResourceSemaphoreFactory");

export const SEMAPHORE_FACTORY_PROVIDER_TOKEN =
   getLocalProviderToken(SEMAPHORE_MODULE_ID, SEMAPHORE_FACTORY_SERVICE_TYPE);

export const SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN =
   getLocalProviderToken(SEMAPHORE_MODULE_ID, NAMED_EITHER_ITERABLE_ANY_TYPE);

export const RESERVATIONS_CHANNEL_TYPE: TypeIdentifier<Chan<IResourceAdapter<any>, any>> =
   getNamedTypeIntent<Chan<IResourceAdapter<any>, any>>("Chan<IResourceAdapter<T>, T>");

export const RETURN_CHANNEL_TYPE: TypeIdentifier<Chan<any, IResourceAdapter<any>>> =
   getNamedTypeIntent<Chan<any, IResourceAdapter<any>>>("Chan<T, IResourceAdapter<T>>");

export const SEMAPHORE_SERVICE_TYPE =
   getNamedTypeIntent<IResourceSemaphore<any>>("IResourceSemaphore<T>");

export const SEMAPHORE_DYNAMIC_MODULE_TYPE =
   getDynamicModuleType(SEMAPHORE_MODULE_ID);
