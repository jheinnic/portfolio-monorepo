import { Provider } from '@nestjs/common';
import { illegalArgs } from '@thi.ng/errors';
import { ConstructorFor } from 'simplytyped';

import { ProviderToken } from '../token';
import { AsyncModuleParam, AsyncModuleParamStyle } from './async-module-param.type';

export function asyncProviderFromParam<Type>(
   // Type, Factory extends (AnyFunc<Type|Promise<Type>>|never) = never
// >(
   providerToken: ProviderToken<Type> |
      (Type extends object ? ConstructorFor<Type> : never) |
      string,
   moduleParam: AsyncModuleParam<Type>): Provider[]
{
   let retVal: Provider[];

   switch (moduleParam.style) {
      case AsyncModuleParamStyle.VALUE: {
         retVal = [
            {
               provide: providerToken,
               useValue: moduleParam.useValue,
            },
         ];
         break;
      }

      case AsyncModuleParamStyle.CLASS: {
         retVal = [{
            provide: providerToken,
            useClass: moduleParam.useClass,
         }];
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
            inject: moduleParam.inject || [],
         }];

         break;
      }
      case AsyncModuleParamStyle.FACTORY_CLASS: {
         retVal = [{
            provide: providerToken,
            useFactory: async factory => factory.create(),
            inject: [moduleParam.useFactoryClass],
         }, {
            provide: moduleParam.useFactoryClass,
            useClass: moduleParam.useFactoryClass,
         }];

         break;
      }
      default: {
         // const foo: never = moduleParam;
         throw illegalArgs(`Unrecognized param style, ${moduleParam}`);
      }
   }

   return retVal;
}
