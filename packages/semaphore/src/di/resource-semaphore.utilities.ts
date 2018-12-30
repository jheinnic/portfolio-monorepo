import {Chan} from 'medium';

import {DynamicProviderToken, getDynamicProviderToken, ModuleIdentifier} from '@jchptf/api';
import {
   LOAD_RESOURCE_STRATEGY_CONFIGURATION_TYPE, RESERVATIONS_CHANNEL_TYPE, RESOURCE_RETURN_CHANNEL_TYPE,
   RESOURCE_SEMAPHORE_DYNAMIC_PROVIDER_BINDING, RESOURCE_SEMAPHORE_SERVICE_TYPE
} from './resource-semaphore.constants';
import {IResourceAdapter, LoadResourcePoolStrategyConfig} from '../interfaces';

function findInputTagName<T extends object>(options: LoadResourcePoolStrategyConfig<T> | string)
{
   let tagName: string;
   if ('string' === typeof options) {
      tagName = options;
   } else {
      tagName = options.name;
   }

   return tagName;
}

export function getResourceSemaphoreToken<T extends object>(
   moduleId: ModuleIdentifier, options: LoadResourcePoolStrategyConfig<T> | string): string
{
   let tagName = findInputTagName(options);
   return getDynamicProviderToken(
      moduleId, RESOURCE_SEMAPHORE_DYNAMIC_PROVIDER_BINDING, RESOURCE_SEMAPHORE_SERVICE_TYPE, tagName)
}

export function getReservationChannelToken<T extends object>(
   moduleId: ModuleIdentifier,
   options: LoadResourcePoolStrategyConfig<T>): DynamicProviderToken<Chan<IResourceAdapter<T>, T>>
{
   let tagName: string = findInputTagName(options);
   // const symbolName = `info.jchein.infrastructure.pool.ReservationChannel<${name}>`;
   return getDynamicProviderToken(
      moduleId, RESOURCE_SEMAPHORE_DYNAMIC_PROVIDER_BINDING, RESERVATIONS_CHANNEL_TYPE, tagName)
}

export function getResourceReturnChannelToken<T extends object>(
   moduleId: ModuleIdentifier,
   options: LoadResourcePoolStrategyConfig<T>): DynamicProviderToken<Chan<T, IResourceAdapter<T>>>
{
   let tagName = findInputTagName(options);
   // const symbolName = `info.jchein.infrastructure.pool.ReturnSink<${name}>`;
   return getDynamicProviderToken(
      moduleId, RESOURCE_SEMAPHORE_DYNAMIC_PROVIDER_BINDING, RESOURCE_RETURN_CHANNEL_TYPE, tagName)
}

export function getResourceSemaphoreOptionsToken<T extends object>(
   moduleId: ModuleIdentifier,
   options: LoadResourcePoolStrategyConfig<T>): DynamicProviderToken<LoadResourcePoolStrategyConfig<T>>
{
   let tagName = findInputTagName(options);
   return getDynamicProviderToken(
      moduleId, RESOURCE_SEMAPHORE_DYNAMIC_PROVIDER_BINDING, LOAD_RESOURCE_STRATEGY_CONFIGURATION_TYPE,
      tagName);
}

// export function getResourcePoolToken