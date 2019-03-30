import { DynamicModule, ForwardReference, Provider, Type } from '@nestjs/common';
import { Builder, Ctor } from 'fluent-interface-builder';

import { IFactory } from '@jchptf/api';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import { IModule } from '../module';
import { ArgsAsInjectableKeys, FactoryMethod, InjectableKey } from '../provider';
import { DynamicProviderBindingStyle } from './dynamic-provider-binding-style.enum';
// import { IBoundDynamicModuleExport } from './bound-dynamic-module-export.type';
import { IBoundDynamicModuleImport } from './bound-dynamic-module-import.type';

/**
 * Internal implementation detail interface extending IDynamicModuleBuilder from public API
 * to provide its terminal build method() and a reference to internal builder state for
 * easy access after a consumer has finished configuring their module.
 */
export interface IDynamicModuleBuilderImpl<Supplier extends IModule, Consumer extends IModule>
   extends IDynamicModuleBuilder<Supplier, Consumer>
{
   value: IWorkingDynamicModule;

   build(): DynamicModule;
}

export function getBuilder<Supplier extends IModule, Consumer extends IModule>(
   supplier: Supplier, consumer: Consumer,
): IDynamicModuleBuilderImpl<Supplier, Consumer>
{
   const BUILDER_CTOR: Ctor<IWorkingDynamicModule, IDynamicModuleBuilderImpl<Supplier, Consumer>> =
      new Builder<IWorkingDynamicModule, IDynamicModuleBuilderImpl<Supplier, Consumer>>()
         .chain(
            'provideValue',
            <Component extends {}>
            (provide: InjectableKey<Component, Supplier>, useValue: Component) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return provideValue(ctx, provide, useValue);
               },
         )
         .chain(
            'provideClass',
            <Component extends {}>
            (provide: InjectableKey<Component, Supplier>, useClass: Type<Component>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return provideClass(ctx, provide, useClass);
               },
         )
         .chain(
            'provideWithFactoryClass',
            <Component extends {}>
            (
               provide: InjectableKey<Component, Supplier>,
               provideFactory: InjectableKey<IFactory<Component>, Supplier>,
               useClass: Type<IFactory<Component>>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return provideWithFactoryClass(ctx, provide, provideFactory, useClass);
               },
         )
         .chain(
            'selectFromSupplier',
            <Component extends {}>
            (
               provide: InjectableKey<Component, Supplier>,
               existing: InjectableKey<Component, Supplier>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return selectFromSupplier(ctx, provide, existing);
               },
         )
         .chain(
            'applyFactoryFromSupplier',
            <Component extends {}>
            (
               provide: InjectableKey<Component, Supplier>,
               factoryToken: InjectableKey<IFactory<Component>, Supplier>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return applyFactoryFromSupplier(ctx, provide, factoryToken);
               },
         )
         .chain(
            'selectFromConsumer',
            <Component extends {}>
            (
               provide: InjectableKey<Component, Supplier>,
               existing: InjectableKey<Component, Consumer>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return selectFromConsumer(ctx, provide, existing);
               },
         )
         .chain(
            'applyFactoryFromConsumer',
            <Component extends {}>
            (
               provide: InjectableKey<Component, Supplier>,
               existing: InjectableKey<IFactory<Component>, Consumer>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return applyFactoryFromConsumer(ctx, provide, existing);
               },
         )
         .chain(
            'callFactoryMethod',
            <Component extends {}>
            (
               provide: InjectableKey<Component, Supplier>,
               useFactory: (() => Component) | (() => Promise<Component>)) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return callFactoryMethod(ctx, provide, useFactory);
               },
         )
         .chain(
            'callSupplierFactoryMethod',
            <Component extends {}, Factory extends FactoryMethod<Component>>
            (provide: InjectableKey<Component, Supplier>,
             useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Supplier>) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return callSupplierFactoryMethod(ctx, provide, useFactory, inject);
               },
         )
         .chain(
            'callConsumerFactoryMethod',
            <Component extends {}, Factory extends FactoryMethod<Component>>
            (
               provide: InjectableKey<Component, Supplier>,
               useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Consumer>,
            ) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return callConsumerFactoryMethod(ctx, provide, useFactory, inject);
               },
         )
         .chain(
            'exportFromSupplier',
            <Component extends {}>
            (
               provide: InjectableKey<Component, Consumer>,
               existing: InjectableKey<Component, Supplier>,
            ) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule =>
               {
                  return exportFromSupplier(provide, existing, ctx);
               },
         )
         .chain(
            'acceptBoundImport',
            <Component extends {}>
            (
               param: IBoundDynamicModuleImport<Component, Supplier, Consumer>,
               andExport: boolean = false,
            ) =>
               (ctx: IWorkingDynamicModule): IWorkingDynamicModule => {
                  let retVal: IWorkingDynamicModule;
                  switch (param.style) {
                     case DynamicProviderBindingStyle.VALUE: {
                        retVal = provideValue(ctx, param.provide, param.useValue);
                        break;
                     }
                     case DynamicProviderBindingStyle.CLASS: {
                        retVal = provideClass(ctx, param.provide, param.useClass);
                        break;
                     }
                     case DynamicProviderBindingStyle.FACTORY_CLASS: {
                        retVal = provideWithFactoryClass(
                           ctx, param.provide, param.provideFactory, param.useFactoryClass);
                        break;
                     }
                     case DynamicProviderBindingStyle.CONSUMER_PROVIDED: {
                        retVal = selectFromConsumer(ctx, param.provide, param.useExisting);
                        break;
                     }
                     case DynamicProviderBindingStyle.CONSUMER_PROVIDED_FACTORY: {
                        retVal = applyFactoryFromConsumer(ctx, param.provide, param.useExisting);
                        break;
                     }
                     case DynamicProviderBindingStyle.SUPPLIER_PROVIDED: {
                        retVal = selectFromSupplier(ctx, param.provide, param.useExisting);
                        break;
                     }
                     case DynamicProviderBindingStyle.SUPPLIER_PROVIDED_FACTORY: {
                        retVal = applyFactoryFromSupplier(ctx, param.provide, param.useExisting);
                        break;
                     }
                     case DynamicProviderBindingStyle.FACTORY_METHOD_CALL: {
                        retVal = callFactoryMethod(ctx, param.provide, param.useFactory);
                        break;
                     }
                     case DynamicProviderBindingStyle.CONSUMER_INJECTED_FUNCTION: {
                        retVal = callConsumerFactoryMethod(
                           ctx,
                           param.provide,
                           param.useFactory,
                           param.inject as ArgsAsInjectableKeys<
                              typeof param.useFactory, Consumer>);
                        break;
                     }
                     case DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION: {
                        retVal = callSupplierFactoryMethod(
                           ctx,
                           param.provide,
                           param.useFactory,
                           param.inject as ArgsAsInjectableKeys<
                              typeof param.useFactory, Supplier>);
                        break;
                     }
                     default: {
                        return undefined as never;
                     }
                  }

                  if (! andExport) {
                     return retVal;
                  }

                  return {
                     ...retVal,
                     supplier: {
                        ...retVal.supplier,
                        exports: [...retVal.supplier.exports!, param.provide],
                     },
                  };
               },
         )
         .chain('bindProvider', (
            provider: Exclude<Provider, Type<any>>,
            andExport: boolean,
         ) => (ctx: IWorkingDynamicModule): IWorkingDynamicModule => {
               if (!! andExport) {
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

function exportFromSupplier<
   Component extends {},
   Supplier extends IModule,
   Consumer extends IModule
>(
   provide: InjectableKey<Component, Consumer>,
   existing: InjectableKey<Component, Supplier>, ctx: IWorkingDynamicModule)
{
   const newProvider: Provider = {
      provide,
      useFactory: component => component,
      inject: [existing],
   };

   return BuilderUtilityFacade.appendSupplierExportProvider(ctx, newProvider, provide);
}

function callConsumerFactoryMethod<
   Component extends {},
   Supplier extends IModule,
   Consumer extends IModule,
   Factory extends FactoryMethod<Component>
>(
   ctx: IWorkingDynamicModule, provide: InjectableKey<Component, Supplier>,
   useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Consumer>)
{
   return BuilderUtilityFacade.appendConsumerProvider(
      ctx,
      {
         provide,
         useFactory,
         inject,
      },
      provide);
}

function callSupplierFactoryMethod<
   Component extends {},
   Supplier extends IModule,
   Factory extends FactoryMethod<Component>
>(
   ctx: IWorkingDynamicModule, provide: InjectableKey<Component, Supplier>,
   useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Supplier>)
{
   return BuilderUtilityFacade.appendSupplierImportProvider(
      ctx, {
         provide,
         useFactory,
         inject,
      });
}

function callFactoryMethod<Component extends {}, Supplier extends IModule>(
   ctx: IWorkingDynamicModule, provide: InjectableKey<Component, Supplier>,
   useFactory: (() => Component) | (() => Promise<Component>))
{
   return BuilderUtilityFacade.appendSupplierImportProvider(
      ctx, {
         provide,
         useFactory,
      });
}

function applyFactoryFromConsumer<
   Component extends {},
   Supplier extends IModule,
   Consumer extends IModule
>(
   ctx: IWorkingDynamicModule,
   provide: InjectableKey<Component, Supplier>,
   existing: InjectableKey<IFactory<Component>, Consumer>)
{
   const newProvider: Provider = {
      provide,
      useFactory: component => component.create(),
      inject: [existing],
   };

   return BuilderUtilityFacade.appendConsumerProvider(ctx, newProvider, provide);
}

function selectFromConsumer<Component extends {}, Supplier extends IModule,
   Consumer extends IModule>(
   ctx: IWorkingDynamicModule,
   provide: InjectableKey<Component, Supplier>,
   existing: InjectableKey<Component, Consumer>)
{
   const newProvider: Provider = {
      provide,
      useFactory: component => component,
      inject: [existing],
   };

   return BuilderUtilityFacade.appendConsumerProvider(ctx, newProvider, provide);
}

function applyFactoryFromSupplier<Component extends {}, Supplier extends IModule>(
   ctx: IWorkingDynamicModule,
   provide: InjectableKey<Component, Supplier>,
   factoryToken: InjectableKey<IFactory<Component>, Supplier>)
{
   const newProvider: Provider = {
      provide,
      useFactory: iFactory => iFactory.create(),
      inject: [factoryToken],
   };

   return BuilderUtilityFacade.appendSupplierImportProvider(ctx, newProvider);
}

function selectFromSupplier<Component extends {}, Supplier extends IModule>(
   ctx: IWorkingDynamicModule, provide: InjectableKey<Component, Supplier>,
   existing: InjectableKey<Component, Supplier>)
{
   const newProvider: Provider = {
      provide,
      useFactory: component => component,
      inject: [existing],
   };

   return BuilderUtilityFacade.appendSupplierImportProvider(ctx, newProvider);
}

function provideWithFactoryClass<Component extends {}, Supplier extends IModule>(
   ctx: IWorkingDynamicModule,
   provide: InjectableKey<Component, Supplier>,
   provideFactory: InjectableKey<IFactory<Component>, Supplier>,
   useClass: Type<IFactory<Component>>,
)
{
   const contextWithFactory =
      BuilderUtilityFacade.appendSupplierImportProvider(
         ctx, {
            provide,
            useClass,
         });

   const newProvider: Provider = {
      provide,
      useFactory: iFactory => iFactory.create(),
      inject: [provideFactory],
   };

   return BuilderUtilityFacade.appendSupplierImportProvider(contextWithFactory, newProvider);
}

function provideClass<Component extends {}, Supplier extends IModule>(
   ctx: IWorkingDynamicModule,
   provide: InjectableKey<Component, Supplier> | Type<Component>,
   useClass: Type<Component>)
{
   return BuilderUtilityFacade.appendSupplierImportProvider(
      ctx, {
         provide,
         useClass,
      });
}

function provideValue<Component extends {}, Supplier extends IModule>(
   ctx: IWorkingDynamicModule,
   provide: InjectableKey<Component, Supplier>,
   useValue: Component)
{
   return BuilderUtilityFacade.appendSupplierImportProvider(
      ctx, {
         provide,
         useValue,
      });
}

// TODO: Merge this into the class below and use it as a base constructor to
//       fluent-interface-builder, allowing its static methods to no longer be static.
interface IWorkingDynamicModule
{
   readonly supplier: DynamicModule;
   readonly consumer: DynamicModule;
}

class BuilderUtilityFacade
{
   static appendSupplierImportProvider(
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

   static appendSupplierExportProvider<Component extends {}, Consumer extends IModule>(
      ctx: IWorkingDynamicModule, newProvider: Provider,
      provide: InjectableKey<Component, Consumer>)
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

   static appendConsumerProvider<Component extends {}, Supplier extends IModule>(
      ctx: IWorkingDynamicModule, newProvider: Provider,
      provide: InjectableKey<Component, Supplier>)
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
}
