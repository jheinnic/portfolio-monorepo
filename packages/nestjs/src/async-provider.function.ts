import { Provider } from '@nestjs/common';
import { illegalArgs } from '@thi.ng/errors';
import { AnyFunc, ConstructorFor } from 'simplytyped';

import { ProviderToken } from './provider-token.type';
import { AsyncModuleParam, AsyncModuleParamStyle } from './async-module-param.type';

// export function isValue<Type>(
//    moduleParam: AsyncModuleParam<Type>): moduleParam is ValueAsyncModuleParam<Type>
// {
//    return moduleParam.style === AsyncModuleParamStyle.VALUE;
// }
//
// export function isExisting<Type>(
//    moduleParam: AsyncModuleParam<Type>): moduleParam is ExistingAsyncModuleParam<Type>
// {
//    return moduleParam.style === AsyncModuleParamStyle.EXISTING;
// }
//
// export function isFactory<Type>(
//    moduleParam: FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
//       | ClassAsyncModuleParam<Type, string>):
//    moduleParam is FactoryAsyncModuleParam<Type, AnyFunc<Promise<Type>>>
// {
//    return moduleParam.style === AsyncModuleParamStyle.FACTORY;
// }
//
// export function isFactoryClass<Type, Key extends string = string>(
//    moduleParam: FactoryClassAsyncModuleParam<Type>
//       | ClassAsyncModuleParam<Type, Key>):
//    moduleParam is ClassAsyncModuleParam<Type, Key>
// {
//    return moduleParam.style === AsyncModuleParamStyle.CLASS;
// }

export function asyncProviderFromParam<
   Type, Factory extends (AnyFunc<Type|Promise<Type>>|never) = never
>(
   providerToken: ProviderToken<Type> | (Type extends object ? ConstructorFor<Type> : never) | string,
   moduleParam: AsyncModuleParam<Type, Factory>): Provider[]
{
   let retVal: Provider[];

   switch (moduleParam.style) {
      case AsyncModuleParamStyle.VALUE:
      {
         retVal = [
            {
               provide: providerToken,
               useValue: moduleParam.useValue,
            }
         ];
         break;
      }

      case AsyncModuleParamStyle.CLASS:
      {
         retVal = [
            {
               provide: providerToken,
               useClass: moduleParam.useClass,
            }
         ];
         break;
      }
      case AsyncModuleParamStyle.EXISTING: {
         // TODO: Does the function need to be async?
         retVal = [{
            provide: providerToken,
            useFactory: (value: Type) => value,
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
      case AsyncModuleParamStyle.FACTORY_CLASS: {
         retVal = [
            {
               provide: providerToken,
               useFactory: async factory => factory.create(),
               inject: [moduleParam.useClass],
            },
            {
               provide: moduleParam.useClass,
               useClass: moduleParam.useClass,
            }
         ];

         break;
      }
      default: {
         let foo: never = moduleParam;
         throw illegalArgs('Unrecognized param style, ' + foo);
      }
   }

   return retVal;
}
