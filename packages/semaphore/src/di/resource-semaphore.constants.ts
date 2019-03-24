import { getLocalProviderTokenString, getModuleIdentifier } from '@jchptf/nestjs';

import { IResourceSemaphore, IResourceSemaphoreFactory } from '../interfaces';

export const SEMAPHORE_MODULE_ID =
   getModuleIdentifier('@jchptf/semaphore');

export const SEMAPHORE_FACTORY_PROVIDER_TOKEN =
   getLocalProviderTokenString<IResourceSemaphoreFactory>(
      SEMAPHORE_MODULE_ID, 'IResourceSemaphoreFactory');

export const SEMAPHORE_RESOURCE_POOL_PROVIDER_TOKEN =
   getLocalProviderTokenString<Iterable<any>|AsyncIterable<any>>(
      SEMAPHORE_MODULE_ID, 'Iterable<any>|AsyncIterable<any>');

// export const RESERVATIONS_CHANNEL_TYPE =
//    getLocalProviderTokenString<IAdapter<Chan<IResourceAdapter<any>, any>>>(
//       'IAdapter<Chan<IResourceAdapter<any>, any>>');

// export const RETURN_CHANNEL_TYPE =
//    getLocalProviderTokenString<IAdapter<Chan<any, IResourceAdapter<any>>>>(
//       'IAdapter<Chan<any, IResourceAdapter<any>>>');

export const SEMAPHORE_SERVICE_PROVIDER_TOKEN =
   getLocalProviderTokenString<IResourceSemaphore<any>>(
      SEMAPHORE_MODULE_ID, 'IResourceSemaphore<any>');

// export const SEMAPHORE_DYNAMIC_MODULE_TYPE =
//    getDynamicModuleKind(SEMAPHORE_MODULE_ID);
