import { Provider } from '@nestjs/common';
import { isKeyOf, Overwrite } from 'simplytyped';
import {
   IClassProvider, IExistingFactoryClassProvider, IExistingProvider, IFactoryClassProvider,
   IFactoryProvider, IValueProvider, NestProvider,
} from './nest-provider.type';
import { ModuleMetadata } from '@nestjs/common/interfaces';

function isValueProvider(nestProvider: NestProvider): nestProvider is IValueProvider
{
   return isKeyOf(nestProvider, 'useValue');
}

function isClassProvider(nestProvider: NestProvider): nestProvider is IClassProvider
{
   return isKeyOf(nestProvider, 'useClass');
}

function isFactoryProvider(nestProvider: NestProvider): nestProvider is IFactoryProvider
{
   return isKeyOf(nestProvider, 'useFactory');
}

function isExistingProvider(nestProvider: NestProvider): nestProvider is IExistingProvider
{
   return isKeyOf(nestProvider, 'useExisting');
}

function isFactoryClassProvider(nestProvider: NestProvider): nestProvider is IFactoryClassProvider
{
   return isKeyOf(nestProvider, 'useFactoryClass');
}

function isExistingFactoryClassProvider(
   nestProvider: NestProvider): nestProvider is IExistingFactoryClassProvider
{
   return isKeyOf(nestProvider, 'useExistingFactoryClass');
}

export function compileModuleDescriptor(
   moduleMetadata: Overwrite<ModuleMetadata, { providers: NestProvider[] }>): ModuleMetadata
{
   if (!moduleMetadata.providers) {
      return {
         ...moduleMetadata,
         providers: undefined,
      };
   }
   const providers: Provider[] = [];

   moduleMetadata.providers.forEach(
      (provider: NestProvider) => {
         if (isValueProvider(provider)) {
            providers.push(provider);
         } else if (isClassProvider(provider)) {
            providers.push(provider);
         } else if (isFactoryProvider(provider)) {
            providers.push(provider);
         } else if (isExistingProvider(provider)) {
            providers.push(
               {
                  provide: provider.provide,
                  useFactory: obj => obj,
                  inject: [provider.useExisting],
               },
            );
         } else if (isFactoryClassProvider(provider)) {
            providers.push(
               {
                  provide: provider.provide,
                  useFactory: factory => factory.create(),
                  inject: [provider.useFactoryClass],
               },
               provider.useFactoryClass,
            );
         } else if (isExistingFactoryClassProvider(provider)) {
            providers.push(
               {
                  provide: provider.provide,
                  useFactory: factory => factory.create(),
                  inject: [provider.useExistingFactoryClass],
               },
            );
         }
      },
   );

   return {
      ...moduleMetadata,
      providers,
   };
}
