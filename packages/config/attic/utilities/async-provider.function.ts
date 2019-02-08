import { Provider } from '@nestjs/common';
import { illegalArgs } from '@thi.ng/errors';
import { AnyFunc } from 'simplytyped';

import {
   AsyncModuleParam, AsyncModuleParamStyle, ClassAsyncModuleParam, ExistingAsyncModuleParam,
   FactoryAsyncModuleParam, ValueAsyncModuleParam,
} from './async-module-param.type';
import { ProviderToken } from '@jchptf/api';

export function isValue<Type extends object>(
   moduleParam: AsyncModuleParam<Type>): moduleParam is ValueAsyncModuleParam<Type>
{
   return moduleParam.style === AsyncModuleParamStyle.VALUE;
}

export function isExisting<Type extends object>(
   moduleParam: AsyncModuleParam<Type>): moduleParam is ExistingAsyncModuleParam<Type>
{
   return moduleParam.style === AsyncModuleParamStyle.EXISTING;
}

export function isFactory<Type extends object>(
   moduleParam: FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
      | ClassAsyncModuleParam<Type, string>):
   moduleParam is FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
{
   return moduleParam.style === AsyncModuleParamStyle.FACTORY;
}

export function isFactoryClass<Type extends object, Key extends string = string>(
   moduleParam: FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
      | ClassAsyncModuleParam<Type, Key>):
   moduleParam is ClassAsyncModuleParam<Type, Key>
{
   return moduleParam.style === AsyncModuleParamStyle.CLASS;
}

export function asyncProviderFromParam<Type extends object>(
   providerToken: ProviderToken<Type>,
   moduleParam: AsyncModuleParam<Type>,
   factoryKey?: string): Provider[]
{
   switch (moduleParam.style) {
      case AsyncModuleParamStyle.VALUE: {
         if ('object' === typeof moduleParam.useValue) {
            return [{
               provide: providerToken,
               useValue: moduleParam.useValue,
            }];
         }

         return [{
            provide: providerToken,
            useClass: moduleParam.useValue,
         }];
      }
      case AsyncModuleParamStyle.EXISTING: {
         return [
            {
               provide: providerToken,
               useFactory: async (value: Type) => value,
               inject: [moduleParam.useExisting],
            },
         ];
      }
   }
   if (isFactory(moduleParam)) {
      return [{
         provide: providerToken,
         ...moduleParam,
      }];
   }

   if (!! factoryKey) {
      type Key = typeof factoryKey;
      if (isFactoryClass<Type, Key>(moduleParam)) {
         return [{
            provide: providerToken,
            useFactory: async (factory: { [K in Key]: () => Type }) => factory[factoryKey!](),
            inject: [moduleParam.useClass],
         }, moduleParam.useClass];
      }
   }

   throw illegalArgs(`Insufficient input to use ${moduleParam}`);
}
