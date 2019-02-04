import { Provider } from '@nestjs/common';
import { illegalArgs } from '@thi.ng/errors';
import { AnyFunc } from 'simplytyped';

import {
   AsyncModuleParam, ClassAsyncModuleParam, ExistingAsyncModuleParam, FactoryAsyncModuleParam,
} from './async-module-param.type';
import { ProviderToken } from '@jchptf/api';

function isExisting<Type>(
   moduleParam: AsyncModuleParam<Type, any>): moduleParam is ExistingAsyncModuleParam<Type>
{
   return (
      moduleParam.hasOwnProperty('useExisting')
   );
}

function isFactory<Type>(
   moduleParam: FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
      | ClassAsyncModuleParam<Type, string>):
   moduleParam is FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
{
   return (
      moduleParam.hasOwnProperty('useFactory')
   );
}

function isClass<Type, Key extends string = string>(
   moduleParam: FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
      | ClassAsyncModuleParam<Type, Key>):
   moduleParam is ClassAsyncModuleParam<Type, Key>
{
   return (
      moduleParam.hasOwnProperty('useClass')
   );
}

export function asyncProviderFromParam<Type extends object>(
   providerToken: ProviderToken<Type>,
   moduleParam: AsyncModuleParam<Type>,
   factoryKey?: string): Provider[]
{
   if (isExisting(moduleParam)) {
      return [{
         provide: providerToken,
         useFactory: async (value: Type) => value,
         inject: [moduleParam.useExisting],
      }];
   }
   if (isFactory(moduleParam)) {
      return [{
         provide: providerToken,
         ...moduleParam,
      }];
   }

   if (!! factoryKey) {
      type Key = typeof factoryKey;
      if (isClass<Type, Key>(moduleParam)) {
         return [{
            provide: providerToken,
            useFactory: async (factory: { [K in Key]: () => Type }) => factory[factoryKey!](),
            inject: [moduleParam.useClass],
         }, moduleParam.useClass];
      }
   }

   throw illegalArgs(`Insufficient input to use ${moduleParam}`);
}
