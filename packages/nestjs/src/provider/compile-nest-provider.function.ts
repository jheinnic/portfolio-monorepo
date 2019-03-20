import { Provider, Type } from '@nestjs/common';
import { isKeyOf } from 'simplytyped';

import {
   IClassProvider, IExistingFactoryClassProvider, IExistingProvider, IFactoryClassProvider,
   IFactoryProvider, IValueProvider, NestProvider,
} from './nest-provider.type';

function isValueProvider<Type>(
   nestProvider: NestProvider<Type>): nestProvider is IValueProvider<Type>
{
   return isKeyOf(nestProvider, 'useValue');
}

function isClassProvider<Type>(
   nestProvider: NestProvider<Type>): nestProvider is IClassProvider<Type>
{
   return isKeyOf(nestProvider, 'useClass');
}

function isFactoryProvider<Type>(
   nestProvider: NestProvider<Type>): nestProvider is IFactoryProvider<Type>
{
   return isKeyOf(nestProvider, 'useFactory');
}

function isExistingProvider<Type>(
   nestProvider: NestProvider<Type>): nestProvider is IExistingProvider<Type>
{
   return isKeyOf(nestProvider, 'useExisting');
}

function isFactoryClassProvider<Type>(
   nestProvider: NestProvider<Type>): nestProvider is IFactoryClassProvider<Type>
{
   return isKeyOf(nestProvider, 'useFactoryClass');
}

function isExistingFactoryClassProvider<Type>(
   nestProvider: NestProvider<Type>): nestProvider is IExistingFactoryClassProvider<Type>
{
   return isKeyOf(nestProvider, 'useExistingFactoryClass');
}

export function compileNestProvider<Component>(
   nestProvider: NestProvider<Component>): Exclude<Provider, Type<any>>[]
{
   const providers: Exclude<Provider, Type<any>>[] = [];

   if (isValueProvider(nestProvider)) {
      providers.push(nestProvider);
   } else if (isClassProvider(nestProvider)) {
      providers.push(nestProvider);
   } else if (isFactoryProvider(nestProvider)) {
      providers.push(nestProvider);
   } else if (isExistingProvider(nestProvider)) {
      providers.push(
         {
            provide: nestProvider.provide,
            useFactory: obj => obj,
            inject: [nestProvider.useExisting],
         },
      );
   } else if (isFactoryClassProvider(nestProvider)) {
      providers.push(
         {
            provide: nestProvider.provide,
            useFactory: factory => factory.create(),
            inject: [nestProvider.useFactoryClass],
         },
         {
            provide: nestProvider.useFactoryClass,
            useClass: nestProvider.useFactoryClass,
         },
      );
   } else if (isExistingFactoryClassProvider(nestProvider)) {
      providers.push(
         {
            provide: nestProvider.provide,
            useFactory: factory => factory.create(),
            inject: [nestProvider.useExistingFactory],
         },
      );
   } else {
      providers.push(
         {
            provide: nestProvider,
            useClass: nestProvider,
         },
      );
   }

   return providers;
}
