import {Chan} from 'medium';

import {
   getDynamicModuleKind, getLocalProviderToken, getModuleIdentifier,
} from '@jchptf/nestjs';
import { IResourceAdapter, IResourceSemaphore, IResourceSemaphoreFactory } from '../interfaces';
import { IAdapter } from '@jchptf/api';

export const SEMAPHORE_MODULE_ID =
   getModuleIdentifier('@jchptf/semaphore');

export const SEMAPHORE_FACTORY_PROVIDER_TOKEN =
   getLocalProviderToken<IResourceSemaphoreFactory>('IResourceSemaphoreFactory');

export const SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN =
   getLocalProviderToken<Iterable<any>|AsyncIterable<any>>('Iterable<any>|AsyncIterable<any>');

// export const RESERVATIONS_CHANNEL_TYPE =
//    getLocalProviderToken<IAdapter<Chan<IResourceAdapter<any>, any>>>(
//       'IAdapter<Chan<IResourceAdapter<any>, any>>');

// export const RETURN_CHANNEL_TYPE =
//    getLocalProviderToken<IAdapter<Chan<any, IResourceAdapter<any>>>>(
//       'IAdapter<Chan<any, IResourceAdapter<any>>>');

export const SEMAPHORE_SERVICE_PROVIDER_TOKEN =
   getLocalProviderToken<IResourceSemaphore<any>>('IResourceSemaphore<any>');

export const SEMAPHORE_DYNAMIC_MODULE_TYPE =
   getDynamicModuleKind(SEMAPHORE_MODULE_ID);
