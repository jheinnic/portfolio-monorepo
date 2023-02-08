import { DynamicModule, ForwardReference, Provider, Type } from '@nestjs/common';
import { Builder, Ctor } from 'fluent-interface-builder';

import { IFactoryMethod } from '@jchptf/api';

import {
    IHasRegistry,
    IModule,
    IModuleRegistry,
    IHaveRegistries,
    ITokenProviding,
    ITokenConsuming,
    ITokenType,
    IToken,
    ITokenProvidingToken,
} from './module';
import { ArgsAsInjectableKeys } from './injectable-key';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import { UnionizeTuple } from 'simplytyped';
import {Insert} from "@jchptf/tupletypes";

/**
 * Internal implementation detail interface extending IDynamicModuleBuilder from public API
 * to provide its terminal build method() and a reference to internal builder state for
 * easy access after a consumer has finished configuring their module.
 */
export interface IDynamicModuleBuilderImpl<
  Supplier extends IModule<never>, Imported extends IHaveRegistries, Origin extends IModule<never>
>
  extends IDynamicModuleBuilder<Supplier, Imported, Origin>
{
   value: DynamicModule;

   build(): DynamicModule;
}

export function getBuilder<
    Supplier extends IModule<never>, Imported extends IHaveRegistries, Origin extends IModule<never>
>(
  supplier: Supplier, consumer: Origin, origins: Imported
): IDynamicModuleBuilderImpl<Supplier, Imported, Origin>
{
    const new_origins: IHaveRegistries = [consumer];
    let index = 0;
    while (index < origins.length) {
        new_origins.push(origins[index]);
        index = index + 1;
    }
   const BUILDER_CTOR: Ctor<DynamicModule, IDynamicModuleBuilderImpl<Supplier, Imported, Origin>> =
     new Builder<DynamicModule, IDynamicModuleBuilderImpl<Supplier, Imported, Origin>>()
       .chain(
         'provideValue',
         <Component, Provided extends ITokenConsuming<Origin, Component>>
         (provide: Provided, useValue: Component) =>
           (ctx: DynamicModule): DynamicModule =>
           {
              return provideValue<Component, Supplier>(ctx, provide, useValue);
           },
       )
       .chain(
         'provideClass',
         <Component>
         (provide: ITokenProviding<Supplier, Component>, useClass: Type<Component>) =>
           (ctx: DynamicModule): DynamicModule =>
           {
              return provideClass(ctx, provide, useClass);
           },
       )
       // .chain(
       //    'provideWithFactoryClass',
       //    <Component extends {}>
       //    (
       //       provide: ITokenProviding<Supplier, Component>,
       //       provideFactory: InjectableKey<IFactoryObject<Component>, Supplier>,
       //       useClass: Type<IFactoryObject<Component>>,
       //    ) =>
       //       (ctx: DynamicModule): DynamicModule =>
       //       {
       //          return provideWithFactoryClass(ctx, provide, provideFactory, useClass);
       //       },
       // )
       .chain(
         'provideExisting',
         <Component>
         (
           _provide: ITokenProviding<Supplier, Component>,
           _existing: ITokenProviding<UnionizeTuple<Insert<Imported, 0, Origin>>, Component>
         ) =>
           (ctx: DynamicModule): DynamicModule =>
           {
               // return provideExisting(ctx, provide, existing);
               // TODO: Fix the third argument in this important function call above!
               return ctx
           },
       // ).chain(
       //     'selectFromOrigin',
       //     <Component>
       //     (
       //       provide: ITokenProviding<Supplier, Component>,
       //       useExisting: ITokenProviding<Origin, Component>,
       //     ) =>
       //       (ctx: DynamicModule): DynamicModule =>
       //       {
       //          return selectFromOrigin(ctx, provide, useExisting);
       //       },
       //   )
       //   .chain(
       //   'selectFromOther',
       //   <Component, Source extends IHasRegistry>
       //   (
       //     provide: ITokenProviding<Supplier, Component>,
       //     useExisting: ITokenProviding<Source, Component>,
       //     fromModule: Type<Source>,
       //   ) =>
       //     (ctx: DynamicModule): DynamicModule =>
       //     {
       //        return selectFromOther(ctx, provide, fromModule, useExisting);
       //     },
       )
       .chain(
         'applyFactoryFromOrigin',
           <Component, Factory extends IFactoryMethod<Component, any[]>>
           (provide: ITokenProviding<Supplier, Component>, useFactory: Factory,
            inject: ArgsAsInjectableKeys<Factory, Insert<Imported, 0, Origin>>) =>
               (ctx: DynamicModule): DynamicModule => {
                   return applyFactoryFromOrigin<Component, Supplier, Origin, Imported, Factory>(
                       ctx, provide, useFactory, inject);
               },
       )
       .chain(
         'callFactoryMethod',
         <Component, Factory extends IFactoryMethod<Component, any[]>>(
           provide: ITokenProviding<Supplier, Component>,
           useFactory: Factory,
           inject: ArgsAsInjectableKeys<Factory, [Supplier]>
       ) =>
           (ctx: DynamicModule): DynamicModule => {
              return provideByFactoryCall(ctx, provide, useFactory, inject);
           }
       // ).chain(
       //   'provideByFactoryCall',
       // )
       // .chain(
       //   'callOriginFactoryMethod',
       //   <Component, Supplier extends IHasRegistry,
       //     Factory extends IFactoryMethod<Component, any>>
       //   (
       //     provide: ITokenProviding<Supplier, Component>,
       //     useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Origin>,
       //   ) =>
       //     (ctx: DynamicModule): DynamicModule =>
       //     {
       //        return callOriginFactoryMethod(ctx, provide, useFactory, inject);
       //     },
       // )
       // .chain(
       //   'callImportableFactoryMethod',
       //   <Component, Supplier extends IHasRegistry,
       //     Source extends IHasRegistry,
       //     Factory extends IFactoryMethod<Component, any>>
       //   (
       //     provide: ITokenProviding<Supplier, Component>, fromSource: Type<Source>,
       //     useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Source>,
       //   ) =>
       //     (ctx: DynamicModule): DynamicModule =>
       //     {
       //        return callImportableFactoryMethod(ctx, provide, fromSource, useFactory, inject);
       //     },
       // )
       ).chain(
         'exportFromSupplier',
         <Component> (
           provide: ITokenProviding<Origin, Component>,
           existing: ITokenProviding<Supplier, Component>,
         ) =>
           (ctx: DynamicModule): DynamicModule =>
           {
              return exportFromSupplier(provide, existing, ctx);
           },
       )
       .chain('bindProvider', (
         provider: IToken<never>,
         andExport: boolean,
         ) => (ctx: DynamicModule): DynamicModule => {
            return {
               ...ctx,
               providers: [...ctx.providers!, provider],
               exports: andExport
                 ? [...ctx.exports!, provider.provide]
                 : ctx.exports!,
            };
         },
       )
.chain(
         'import',
         (
           source: Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference,
           andExport: boolean = false) => (ctx: DynamicModule): DynamicModule =>
           (
             {
                ...ctx,
                imports: [...ctx.imports!, source],
                exports: andExport
                  ? [...ctx.exports!, source]
                  : ctx.exports,
             }
           ),
       )
       .chain(
         'imports',
         (
           source: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference)[],
           exportAll: boolean = false) => (ctx: DynamicModule): DynamicModule =>
           (
             {
                ...ctx,
                imports: [...ctx.imports!, ...source],
                exports: exportAll
                  ? [...ctx.exports!, ...source]
                  : ctx.exports,
             }
           ),
       )
       .chain(
         'controller',
         (source: Type<any>) => (ctx: DynamicModule): DynamicModule =>
           (
             {
                ...ctx,
                controllers: [...ctx.controllers!, source],
             }
           ),
       )
       .chain(
         'controllers',
         (source: Type<any>[]) => (ctx: DynamicModule): DynamicModule =>
           (
             {
                ...ctx,
                controllers: [...ctx.controllers!, ...source],
             }
           ),
       // )
       // .chain(
       //   'addImportFromConfig',
       //   <Token extends IToken<Supplier>>
       //   (importKey: Token, importItem: IBoundDynamicModuleImport<Supplier, Token, Imported>,
       //    andExport: boolean = false) =>
       //     (ctx: DynamicModule): DynamicModule => {
       //        let retVal: DynamicModule;
       //        switch (importItem.style) {
       //           case DynamicProviderBindingStyle.VALUE:
       //           {
       //              retVal = BuilderUtilityFacade.appendSupplierImportProvider(
       //                ctx, {
       //                   provide: importKey,
       //                   useValue: importItem.useValue,
       //                });
       //              break;
       //           }
       //           case DynamicProviderBindingStyle.CLASS:
       //           {
           //          retVal = BuilderUtilityFacade.appendSupplierImportProvider(
           //            ctx, {
           //               provide: importKey,
           //               useClass: importItem.useClass,
           //            });
           //          break;
           //       }
           //       case DynamicProviderBindingStyle.EXISTING:
           //       {
           //          retVal = BuilderUtilityFacade.appendSupplierImportProvider(
           //            ctx, {
           //               provide: importKey,
           //               useExisting: importItem.useExisting,
           //            });
           //          break;
           //       }
           //      // case DynamicProviderBindingStyle.CONSUMER_PROVIDED_FACTORY:
           //      // {
           //      //    retVal = applyFactoryFromOrigin(ctx, param.provide, param.useExisting);
           //      //    break;
           //      // }
           //      // case DynamicProviderBindingStyle.SUPPLIER_PROVIDED:
           //      // {
           //      //    retVal = selectFromSupplier(ctx, param.provide, param.useExisting);
           //      //    break;
           //      // }
           //      // case DynamicProviderBindingStyle.SUPPLIER_PROVIDED_FACTORY:
           //      // {
           //      //    retVal = applyFactoryFromSupplier(ctx, param.provide, param.useExisting);
           //      //    break;
           //      // }
           //      // case DynamicProviderBindingStyle.FACTORY_METHOD_CALL:
           //      // {
           //      //    retVal = callFactoryMethod(ctx, param.provide, param.useFactory);
           //      //    break;
           //      // }
           //       case DynamicProviderBindingStyle.INJECTED_FACTORY:
           //       {
           //          retVal = BuilderUtilityFacade.appendSupplierImportProvider(
           //            ctx, {
           //               provide: importKey,
           //               useFactory: importItem.useFactory,
           //               inject: importItem.inject,
           //            },
           //          );
           //          break;
           //       }
           //      // case DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION:
           //      // {
           //      //    retVal = callSupplierFactoryMethod(
           //      //      ctx,
           //      //      param.provide,
           //      //      param.useFactory,
           //      //      param.inject as ArgsAsInjectableKeys<typeof param.useFactory, Supplier>);
           //      //    break;
           //      // }
           //       default:
           //       {
           //          return undefined as never;
           //       }
           //    }
           //
           //    if (!andExport) {
           //       return retVal;
           //    }
           //
           //    return {
           //       ...retVal,
           //       exports: [...retVal.exports!, importKey],
           //    };
           // },
       ).unwrap<DynamicModule>(
         'build', () => (ctx: DynamicModule): DynamicModule => {
            // const consumer = ctx.consumer;
            // const supplier = ctx.supplier;
            // supplier.imports!.push(consumer);

            return ctx;
         },
       )
       .value;

   return new BUILDER_CTOR(
      {
         module: supplier,
         imports: new_origins.map( (x) => IModule<never>),
         controllers: [],
         providers: [],
         exports: [],
      },
   );
}

// function callImportableFactoryMethod<Component,
//   Supplier extends IHasRegistry,
//   Source extends IHasRegistry,
//   Factory extends IFactoryMethod<Component, any>>(
//   ctx: DynamicModule, provide: ITokenProviding<Supplier, Component>,
//   fromSource: Type<Source>, useFactory: Factory,
//   inject: ArgsAsInjectableKeys<Factory, Source>)
// {
//    return BuilderUtilityFacade.appendOtherImportProvider(
//      ctx,
//      fromSource,
//       {
//          provide,
//          useFactory,
//          inject,
//       },
//    );
// }
//
// function callOriginFactoryMethod<Component,
//   Supplier extends IHasRegistry,
//   Origin extends IHasRegistry,
//   Factory extends IFactoryMethod<Component, any>>(
//   ctx: DynamicModule, provide: ITokenProviding<Supplier, Component>,
//   useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Origin>)
// {
//    return BuilderUtilityFacade.appendOriginImportProvider(
//      ctx,
//       {
//          provide,
//          useFactory,
//          inject,
//       },
//    );
// }

function provideByFactoryCall<Component,
  Supplier extends IModule<never>,
  Factory extends IFactoryMethod<Component, any[]>
>(
  ctx: DynamicModule, provide: ITokenProviding<Supplier, Component>,
  useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, [Supplier]>)
{
   return BuilderUtilityFacade.appendSupplierImportProvider(
      ctx,
      {
         provide,
         useFactory,
         inject,
      },
   );
}

function applyFactoryFromOrigin<Component,
  Supplier extends IModule<never>,
  Origin extends IModule<never>,
  Imported extends IHaveRegistries,
  Factory extends IFactoryMethod<Component, any[]>
>(
  ctx: DynamicModule,
  provide: ITokenProviding<Supplier, Component>,
  useFactory: Factory,
  inject: ArgsAsInjectableKeys<Factory, Insert<Imported, 0, Origin>>
)
{
   const newProvider: Provider = {
      provide,
      useFactory,
      inject
   };

   return BuilderUtilityFacade.appendOriginImportProvider(ctx, newProvider);
}

// function selectFromOrigin<Component, Supplier extends IHasRegistry,
//   Origin extends IHasRegistry>(
//   ctx: DynamicModule,
//   provide: ITokenProviding<Supplier, Component>,
//   useExisting: ITokenProviding<Origin, Component>)
// {
//    const newProvider: Provider = {
//       provide,
//       useExisting,
//    };
//
//    return BuilderUtilityFacade.appendOriginImportProvider(ctx, newProvider);
// }
//
// function selectFromOther<Component, Supplier extends IHasRegistry,
//   Source extends IHasRegistry>(
//   ctx: DynamicModule,
//   provide: ITokenProviding<Supplier, Component>,
//   fromModule: Type<Source>,
//   useExisting: ITokenProviding<Source, Component>)
// {
//    const newProvider: Provider = {
//       provide,
//       useExisting,
//    };
//
//    return BuilderUtilityFacade.appendOtherImportProvider(ctx, fromModule, newProvider);
// }

// function applyFactoryFromSupplier<Component, Supplier extends IHasRegistry>(
//   ctx: DynamicModule,
//   provide: ITokenProviding<Supplier, Component>,
//   factoryToken: ITokenProviding<Supplier, IFactory<Component>>)
// {
//    const newProvider: Provider = {
//       provide,
//       useFactory: (iFactory) => syncCreate(iFactory),
//       inject: [factoryToken],
//    };
//
//    return BuilderUtilityFacade.appendSupplierImportProvider(ctx, newProvider);
// }

// @ts-ignore
function provideExisting<
  Component, Supplier extends IModule<never>, Origin extends IModule<never>
>(
  ctx: DynamicModule,
  provide: ITokenConsuming<Origin, Component>,
  useExisting: ITokenProviding<Supplier, Component>)
{
   const newProvider: Provider = {
      provide,
      useExisting,
   };

   return BuilderUtilityFacade.appendOriginImportProvider(ctx, newProvider);
}

// function provideWithFactoryClass<Component, Supplier extends IHasRegistry>(
//   ctx: DynamicModule,
//   provide: ITokenProviding<Supplier, Component>,
//   provideFactory: ITokenProviding<Supplier, IFactoryObject<Component>>,
//   useClass: Type<IFactoryObject<Component>>,
// )
// {
//    const contextWithFactory =
//      BuilderUtilityFacade.appendSupplierImportProvider(
//        ctx, {
//           provide,
//           useClass,
//        });
//
//    const newProvider: Provider = {
//       provide,
//       useFactory: (iFactory) => syncCreate(iFactory),
//       inject: [provideFactory],
//    };
//
//    return BuilderUtilityFacade.appendSupplierImportProvider(contextWithFactory, newProvider);
// }

function provideClass<Component, Supplier extends IHasRegistry>(
  ctx: DynamicModule, provide: ITokenProviding<Supplier, Component> | Type<Component>, useClass: Type<Component>)
{
   return BuilderUtilityFacade.appendSupplierImportProvider(
     ctx, {
        provide,
        useClass,
     });
}

function provideValue<Component, Supplier extends IHasRegistry>(
  ctx: DynamicModule, provide: ITokenProviding<Supplier, Component> | Type<Component>, useValue: Component)
{
   return BuilderUtilityFacade.appendSupplierImportProvider(
     ctx, {
        provide,
        useValue,
     });
}

// TODO: Merge this into the class below and use it as a base constructor to
//       fluent-interface-builder, allowing its static methods to no longer be static.
// interface DynamicModule
// {
//    readonly supplier: DynamicModule;
//    readonly consumer: DynamicModule;
// }

function exportFromSupplier<
  Component, Supplier extends IModule<never>, Origin extends IModule<never>,
    Existing extends ITokenProviding<Supplier, Component>,
    Providing extends ITokenProviding<Origin, ITokenType<Existing>>
>(provide: Providing, useExisting: Existing, ctx: DynamicModule)
{
   const newProvider: Provider = {
      provide,
      useExisting,
   };

   return BuilderUtilityFacade.appendSupplierExportProvider(ctx, newProvider, provide);
}

class BuilderUtilityFacade
{
   static appendSupplierImportProvider(
     ctx: DynamicModule, newProvider: Provider): DynamicModule
   {
      return {
         ...ctx,
         providers: [...ctx.providers!, newProvider],
      };
   }

   static appendOriginImportProvider(
     ctx: DynamicModule, newProvider: Provider): DynamicModule
   {
      return {
         ...ctx,
         providers: [...ctx.providers!, newProvider],
      };
   }

   static appendOtherImportProvider(
     ctx: DynamicModule, importSource: Type<IModule<never>>, newProvider: Provider)
   {
      return {
         ...ctx,
         imports: [...ctx.imports!, importSource],
         providers: [...ctx.providers!, newProvider],
      };
   }

   static appendSupplierExportProvider<Component, Origin extends IHasRegistry>(
     ctx: DynamicModule, newProvider: Provider, provide: ITokenProviding<Origin, Component>)
   {
      return {
         ...ctx,
         providers: [...ctx.providers!, newProvider],
         exports: [...ctx.exports!, provide],
      };
   }
}
