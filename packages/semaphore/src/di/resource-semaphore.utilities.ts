import {Chan} from 'medium';

import {
   DynamicProviderToken, getDynamicProviderToken, ModuleIdentifier
} from '@jchptf/nestjs';
import {
   RESERVATIONS_CHANNEL_TYPE, RETURN_CHANNEL_TYPE,
   SEMAPHORE_DYNAMIC_MODULE_TYPE, SEMAPHORE_SERVICE_TYPE
} from './resource-semaphore.constants';
import { IResourceAdapter, IResourceSemaphore } from '../interfaces';

export function getResourceSemaphoreToken<T extends object>(
   moduleId: ModuleIdentifier, instanceTag?: string): DynamicProviderToken<IResourceSemaphore<T>>
{
   return getDynamicProviderToken(
      moduleId, SEMAPHORE_DYNAMIC_MODULE_TYPE, SEMAPHORE_SERVICE_TYPE, instanceTag)
}

export function getReservationChannelToken<T extends object>(
   moduleId: ModuleIdentifier, instanceTag?: string): DynamicProviderToken<Chan<IResourceAdapter<T>, T>>
{
   // const symbolName = `info.jchein.infrastructure.pool.ReservationChannel<${name}>`;
   return getDynamicProviderToken(
      moduleId, SEMAPHORE_DYNAMIC_MODULE_TYPE, RESERVATIONS_CHANNEL_TYPE, instanceTag)
}

export function getResourceReturnChannelToken<T extends object>(
   moduleId: ModuleIdentifier, instanceTag?: string): DynamicProviderToken<Chan<T, IResourceAdapter<T>>>
{
   // const symbolName = `info.jchein.infrastructure.pool.ReturnSink<${name}>`;
   return getDynamicProviderToken(
      moduleId, SEMAPHORE_DYNAMIC_MODULE_TYPE, RETURN_CHANNEL_TYPE, instanceTag)
}
