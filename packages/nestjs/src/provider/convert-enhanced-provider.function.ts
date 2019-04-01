import { Provider } from '@nestjs/common';
import { isKeyOf } from 'simplytyped';
import { IModule } from '../module';
import {
   IClassProvider, IValueProvider, IEnhancedProvider, IFromExisting, IFromExistingFactory,
   IFromFactoryCall,
} from './enhanced-provider.type';
import { InjectableKey } from './injectable-key.type';
import { IFactory, syncCreate } from '@jchptf/api';

export function isValue<Component extends {}, Module extends IModule, Value>(
   provider: IEnhancedProvider<Component, Module, Value>,
): provider is IValueProvider<Component, Module, Value> {
   return isKeyOf(provider, 'useValue');
}

export function isClass<Component extends {}, Module extends IModule, Value>(
   provider: IEnhancedProvider<Component, Module, Value>,
): provider is IClassProvider<Component, Module, Value> {
   return isKeyOf(provider, 'useClass');
}

// export function isFactoryClass<Component extends {}, Module extends IModule, Value>(
//    provider: IEnhancedProvider<Component, Module, Value>,
// ): provider is IFromFactoryClass<Component, Module, Value> {
//    return isKeyOf(provider, 'useFactoryClass');
// }

export function isExisting<Component extends {}, Module extends IModule, Value>(
   provider: IEnhancedProvider<Component, Module, Value>,
): provider is IFromExisting<Component, Module, Value> {
   return isKeyOf(provider, 'useExisting');
}

export function isExistingFactory<Component extends {}, Module extends IModule, Value>(
   provider: IEnhancedProvider<Component, Module, Value>,
): provider is IFromExistingFactory <Component, Module, Value> {
   return isKeyOf(provider, 'useExistingFactory');
}

export function isFactory<Component extends {}, Module extends IModule, Value>(
   provider: IEnhancedProvider<Component, Module, Value>,
): provider is IFromFactoryCall<Component, Module, Value> {
   return isKeyOf(provider, 'useFactory');
}

export function convertEnhancedProvider<
   Component extends {}, Module extends IModule
>(
   src: IEnhancedProvider<Component, Module, string|symbol>,
): Provider
{
   let retVal: Provider;

   if (isValue(src)) {
      retVal = src;
   } else if (isClass(src)) {
      retVal = src;
   // } else if (isFactoryClass(src)) {
   //    retVal = provideWithFactoryClass(src.provide, src.provideFactory, src.useFactoryClass);
   //    break;
   } else if (isExisting(src)) {
      retVal = selectExisting(src.provide, src.useExisting);
   } else if (isExistingFactory(src)) {
      retVal = applyExistingFactory(src.provide, src.useExistingFactory);
   } else if (isFactory(src)) {
      retVal = src;
      // callFactoryMethod(
      //    src.provide,
      //    src.useFactory,
      //    src.inject as ArgsAsInjectableKeys<typeof src.useFactory, Module>);
   } else {
      return undefined as never;
   }

   return retVal;
}

// function callFactoryMethod<
//    Component extends {},
//    Module extends IModule,
//    Factory extends FactoryMethod<Component>
//    >(
//    provide: InjectableKey<Component, Module>,
//    useFactory: Factory,
//    inject: ArgsAsInjectableKeys<Factory, Module>)
// {
//    return {
//       provide,
//       useFactory,
//       inject,
//    };
// }

function applyExistingFactory<Component extends {}, Module extends IModule>(
   provide: InjectableKey<Component, Module>,
   factoryToken: InjectableKey<IFactory<Component>, Module>)
{
   return {
      provide,
      useFactory: (iFactory: IFactory<Component>) => syncCreate(iFactory),
      inject: [factoryToken],
   };
}

function selectExisting<Component extends {}, Module extends IModule>(
   provide: InjectableKey<Component, Module>,
   existing: InjectableKey<Component, Module>)
{
   return {
      provide,
      useFactory: (component: Component) => component,
      inject: [existing],
   };
}

// function provideWithFactoryClass<Component extends {}, Module extends IModule>(
//    provide: InjectableKey<Component, Module>,
//    provideFactory: InjectableKey<IFactoryObject<Component>, Module>,
//    useClass: Type<IFactoryObject<Component>>,
// )
// {
//    const contextWithFactory =
//       BuilderUtilityFacade.appendModuleImportProvider(
//          ctx, {
//             provide,
//             useClass,
//          });
//
//    const newProvider: Provider = {
//       provide,
//       useFactory: iFactory => iFactory.create(),
//       inject: [provideFactory],
//    };
//
//    return BuilderUtilityFacade.appendModuleImportProvider(contextWithFactory, newProvider);
// }
