import { DynamicModule, ForwardReference, Provider, Type } from '@nestjs/common';
import { Builder, Ctor } from 'fluent-interface-builder';

import { IFactory } from '@jchptf/api';
import { IWorkingDynamicModule } from './working-dynamic-module.interface';
import { IDynamicModuleBuilderImpl } from './dynamic-module-builder-impl.interface';
import { LocalProviderToken } from 'provider-token.type';
import { InjectableKey } from 'injectable-key.type';
import { NestFactory } from 'nest-factory.type';
import { ArgsAsInjectableKeys } from 'args-as-injectable-keys.type';
import { ModuleIdentifier } from 'module-identifier.type';

export function getBuilder<Supplier extends string | symbol, Consumer extends string | symbol>(
   supplier: Type<any>, consumer: Type<any>): IDynamicModuleBuilderImpl<Supplier, Consumer>
{
   const BUILDER_CTOR: Ctor<IWorkingDynamicModule, IDynamicModuleBuilderImpl<Supplier, Consumer>> =
      new Builder<IWorkingDynamicModule, IDynamicModuleBuilderImpl<Supplier, Consumer>>()
         .chain(
            'provideValue',
            <Component extends {}>
            (provide: LocalProviderToken<Component, Supplier>, useValue: Component) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return appendSupplierImportProvider(
                     ctx, {
                        provide,
                        useValue,
                     });
               },
         )
         .chain(
            'provideClass',
            <Component extends {}>
            (provide: LocalProviderToken<Component, Supplier>, useClass: Type<Component>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return appendSupplierImportProvider(
                     ctx, {
                        provide,
                        useClass,
                     });
               },
         )
         .chain(
            'provideWithFactoryClass',
            <Component extends {}>
            (
               provide: LocalProviderToken<Component, Supplier>,
               provideFactory: LocalProviderToken<IFactory<Component>, Supplier>,
               useClass: Type<IFactory<Component>>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  const contextWithFactory =
                     appendSupplierImportProvider(ctx, { provide, useClass });

                  const newProvider: Provider = {
                     provide,
                     useFactory: iFactory => iFactory.create(),
                     inject: [provideFactory],
                  };

                  return appendSupplierImportProvider(contextWithFactory, newProvider);
               },
         )
         .chain(
            'selectFromSupplier',
            <Component extends {}>
            (
               provide: LocalProviderToken<Component, Supplier>,
               existing: InjectableKey<Component, Supplier>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  const newProvider: Provider = {
                     provide,
                     useFactory: component => component,
                     inject: [existing],
                  };

                  return appendSupplierImportProvider(ctx, newProvider);
               },
         )
         .chain(
            'applyFactoryFromSupplier',
            <Component extends {}>
            (
               provide: LocalProviderToken<Component, Supplier>,
               factoryToken: InjectableKey<IFactory<Component>, Supplier>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  const newProvider: Provider = {
                     provide,
                     useFactory: iFactory => iFactory.create(),
                     inject: [factoryToken],
                  };

                  return appendSupplierImportProvider(ctx, newProvider);
               },
         )
         .chain(
            'selectFromConsumer',
            <Component extends {}>
            (
               provide: LocalProviderToken<Component, Supplier>,
               existing: LocalProviderToken<Component, Consumer>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  const newProvider: Provider = {
                     provide,
                     useFactory: component => component,
                     inject: [existing],
                  };

                  return appendConsumerProvider(ctx, newProvider, provide);
               },
         )
         .chain(
            'applyFactoryFromConsumer',
            <Component extends {}>
            (
               provide: LocalProviderToken<Component, Supplier>,
               existing: LocalProviderToken<IFactory<Component>, Consumer>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  const newProvider: Provider = {
                     provide,
                     useFactory: component => component.create(),
                     inject: [existing],
                  };

                  return appendConsumerProvider(ctx, newProvider, provide);
               },
         )
         // .chain(
         //    'selectExistingSupplierFactory',
         //    <Component extends {}>
         //    (
         //       provide: LocalProviderToken<IFactory<Component>, Supplier>,
         //       existing: InjectableKey<IFactory<Component>, Supplier>) =>
         //       (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
         //       {
         //          const newProvider: Provider = {
         //             provide,
         //             useFactory: component => component,
         //             inject: [existing],
         //          };
         //
         //          return appendSupplierImportProvider(ctx, newProvider);
         //       },
         // )
         .chain(
            'callFactoryMethod',
            <Component extends {}>
            (provide: LocalProviderToken<Component, Supplier>,
             useFactory: (() => Component) | (() => Promise<Component>)) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return appendSupplierImportProvider(ctx, { provide, useFactory });
               },
         )
         .chain(
            'callSupplierFactoryMethod',
            <Component extends {}, Factory extends NestFactory<Component>>
            (provide: LocalProviderToken<Component, Supplier>,
             useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Supplier>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return appendSupplierImportProvider(ctx, { provide, useFactory, inject });
               },
         )
         .chain(
            'callConsumerFactoryMethod',
            <Component extends {}, Factory extends NestFactory<Component>>
            (provide: LocalProviderToken<Component, Supplier>,
             useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Consumer>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return appendConsumerProvider(ctx, { provide, useFactory, inject }, provide);
               },
         )
         .chain(
            'exportFromSupplier',
            <Component extends {}>
            (provide: LocalProviderToken<Component, Consumer>,
             existing: LocalProviderToken<Component, Supplier>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  const newProvider: Provider = {
                     provide,
                     useFactory: component => component,
                     inject: [existing],
                  };

                  return appendSupplierExportProvider(ctx, newProvider, provide);
               },
         )
         // .chain(
         //    'exportExistingSupplierFactory',
         //    <Component extends {}>
         //    (provide: LocalProviderToken<IFactory<Component>, Consumer>,
         //     existing: LocalProviderToken<IFactory<Component>, Supplier>) =>
         //       (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
         //       {
         //          const newProvider: Provider = {
         //             provide,
         //             useFactory: component => component,
         //             inject: [existing],
         //          };
         //
         //          return appendSupplierExportProvider(ctx, newProvider, provide);
         //       },
         // )
         .chain('bindProvider', (
            provider: Exclude<Provider, Type<any>>, withExport: boolean
            ) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule => {
               if (withExport) {
                  return {
                     ...ctx,
                     supplier: {
                        ...ctx.supplier,
                        providers: [...ctx.supplier.providers!, provider],
                        exports: [...ctx.supplier.exports!, provider.provide],
                     },
                  };
               }

               return {
                  ...ctx,
                  supplier: {
                     ...ctx.supplier,
                     providers: [...ctx.supplier.providers!, provider],
                  },
               };
            },
         )
         .chain(
            'import',
            (
               source: Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference,
               andExport: boolean = false) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               (
                  {
                     ...ctx,
                     supplier: {
                        ...ctx.supplier,
                        imports: [...ctx.supplier.imports!, source],
                        exports: andExport
                           ? [...ctx.supplier.exports!, source]
                           : ctx.supplier.exports,
                     },
                  }
               ),
         )
         .chain(
            'imports',
            (
               source: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference)[],
               exportAll: boolean = false) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               (
                  {
                     ...ctx,
                     supplier: {
                        ...ctx.supplier,
                        imports: [...ctx.supplier.imports!, ...source],
                        exports: exportAll
                           ? [...ctx.supplier.exports!, ...source]
                           : ctx.supplier.exports,
                     },
                  }
               ),
         )
         .chain(
            'controller',
            (source: Type<any>) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               (
                  {
                     ...ctx,
                     supplier: {
                        ...ctx.supplier,
                        controllers: [...ctx.supplier.controllers!, source],
                     },
                  }
               ),
         )
         .chain(
            'controllers',
            (source: Type<any>[]) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               (
                  {
                     ...ctx,
                     supplier: {
                        ...ctx.supplier,
                        controllers: [...ctx.supplier.controllers!, ...source],
                     },
                  }
               ),
         )
         .unwrap<DynamicModule>(
            'build', () => (ctx: IWorkingDynamicModule): DynamicModule => {
               const consumer = ctx.consumer;
               const supplier = ctx.supplier;
               supplier.imports!.push(consumer);

               return supplier;
            },
         )
         .value;

   return new BUILDER_CTOR(
      {
         consumer: {
            module: consumer,
            imports: [],
            controllers: [],
            providers: [],
            exports: [],
         },
         supplier: {
            module: supplier,
            imports: [],
            controllers: [],
            providers: [],
            exports: [],
         },
      },
   );
}

function appendSupplierImportProvider(
   ctx: IWorkingDynamicModule, newProvider: Provider): IWorkingDynamicModule
{
   return {
      ...ctx,
      supplier: {
         ...ctx.supplier,
         providers: [...ctx.supplier.providers!, newProvider],
      },
   };
}

function appendSupplierExportProvider<Component extends {}, Consumer extends ModuleIdentifier>(
   ctx: IWorkingDynamicModule, newProvider: Provider,
   provide: LocalProviderToken<Component, Consumer>)
{
   return {
      ...ctx,
      supplier: {
         ...ctx.supplier,
         providers: [...ctx.supplier.providers!, newProvider],
         exports: [...ctx.supplier.exports!, provide],
      },
   };
}

function appendConsumerProvider<Component extends {}, Supplier extends ModuleIdentifier>(
   ctx: IWorkingDynamicModule, newProvider: Provider,
   provide: LocalProviderToken<Component, Supplier>)
{
   return {
      ...ctx,
      consumer: {
         ...ctx.consumer,
         providers: [...ctx.consumer.providers!, newProvider],
         exports: [...ctx.consumer.exports!, provide],
      },
   };
}
