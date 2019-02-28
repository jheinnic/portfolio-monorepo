import { Provider } from '@nestjs/common';
import { illegalArgs, illegalState } from '@thi.ng/errors';
import { AnyFunc, ConstructorFor } from 'simplytyped';

import { ProviderToken } from '../di';
import {
   AsyncModuleParam, AsyncModuleParamStyle, ClassAsyncModuleParam, ExistingAsyncModuleParam,
   FactoryAsyncModuleParam, ValueAsyncModuleParam,
} from './async-module-param.type';

export function isValue<Type>(
   moduleParam: AsyncModuleParam<Type>): moduleParam is ValueAsyncModuleParam<Type>
{
   return moduleParam.style === AsyncModuleParamStyle.VALUE;
}

export function isExisting<Type>(
   moduleParam: AsyncModuleParam<Type>): moduleParam is ExistingAsyncModuleParam<Type>
{
   return moduleParam.style === AsyncModuleParamStyle.EXISTING;
}

export function isFactory<Type>(
   moduleParam: FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
      | ClassAsyncModuleParam<Type, string>):
   moduleParam is FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
{
   return moduleParam.style === AsyncModuleParamStyle.FACTORY;
}

export function isFactoryClass<Type, Key extends string = string>(
   moduleParam: FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
      | ClassAsyncModuleParam<Type, Key>):
   moduleParam is ClassAsyncModuleParam<Type, Key>
{
   return moduleParam.style === AsyncModuleParamStyle.CLASS;
}

export function asyncProviderFromParam<
   Type, Key extends string|AnyFunc<Promise<Type>>|undefined = undefined
>(
   providerToken: ProviderToken<Type> | (Type extends object ? ConstructorFor<Type> : never),
   moduleParam: AsyncModuleParam<Type, Key>,
   factoryKey?: Key): Provider[]
{
   let retVal: Provider[];

   switch (moduleParam.style) {
      case AsyncModuleParamStyle.VALUE: {
         if ('object' === typeof moduleParam.useValue) {
            retVal = [{
               provide: providerToken,
               useValue: moduleParam.useValue,
            }];
         } else {
            retVal = [{
               provide: providerToken,
               useClass: moduleParam.useValue,
            }];
         }

         break;
      }
      case AsyncModuleParamStyle.EXISTING: {
         retVal = [{
            provide: providerToken,
            useFactory: async (value: Type) => value,
            inject: [moduleParam.useExisting],
         }];

         break;
      }
      case AsyncModuleParamStyle.FACTORY: {
         retVal = [{
            provide: providerToken,
            useFactory: moduleParam.useFactory,
            inject: moduleParam.inject,
         }];

         break;
      }
      case AsyncModuleParamStyle.CLASS: {
         if (!factoryKey || 'string' !== typeof factoryKey) {
            throw illegalArgs(
               'Using factory class requires including string key for its factory method');
         }

         if (! isFactoryClass<Type, Extract<Key, string>>(moduleParam)) {
            throw illegalArgs(
               'Using factory class requires including string key for its factory method');
         }

         retVal = [
            {
               provide: providerToken,
               useFactory: async factory => factory[factoryKey](),
               inject: [moduleParam.useClass],
            },
            {
               provide: moduleParam.useClass,
               useClass: moduleParam.useClass,
            },
         ];

         break;
      }
      default: {
         throw illegalState('Unreachable code');
      }
   }

   return retVal;
}
