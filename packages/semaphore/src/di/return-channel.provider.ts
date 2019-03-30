import { Chan } from 'medium';

import { IAdapter } from '@jchptf/api';
import { DynamicProviderBindingStyle, IBoundDynamicModuleImport } from '@jchptf/nestjs';

import { IResourceAdapter, IResourceSemaphore } from '../interfaces';

import {
   SemaphoreModuleId, RETURN_CHANNEL_PROVIDER_TOKEN, SEMAPHORE_SERVICE_PROVIDER_TOKEN,
} from './resource-semaphore.constants';

export const RETURN_CHANNEL_PROVIDER:
   IBoundDynamicModuleImport<any, typeof SemaphoreModuleId, any> = {
      style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION,
      provide: RETURN_CHANNEL_PROVIDER_TOKEN,
      useFactory: <T extends object>(
      sem: IResourceSemaphore<T>): IAdapter<Chan<T, IResourceAdapter<T>>> =>
      {
         const unwrapValue = sem.getReturnChan();
         return {
            unwrap() { return unwrapValue; },
         };
      },
      inject: [SEMAPHORE_SERVICE_PROVIDER_TOKEN],
   };
