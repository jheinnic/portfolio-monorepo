import { DynamicModule, ForwardReference, Provider, Type } from '@nestjs/common';
import { Builder, Ctor } from 'fluent-interface-builder';

import { IFactoryMethod } from '@jchptf/api';

import {
   IModule, IModuleRegistry, IModuleTupleTypes, IToken, ITokenProviding, ITokenRequiring,
} from './module';
import { ArgsAsInjectableKeys } from './injectable-key';
import { IDynamicModuleBuilder } from './dynamic-module-builder.interface';
import {
   DynamicProviderBindingStyle, IBoundDynamicModuleImport,
} from './dynamic-module-config.type';
import { UnionizeTuple } from 'simplytyped';

/**
 * Internal implementation detail interface extending IDynamicModuleBuilder from public API
 * to provide its terminal build method() and a reference to internal builder state for
 * easy access after a consumer has finished configuring their module.
 */
export interface IDynamicModuleBuilderImpl<
  Supplier extends IModule<IModuleRegistry>,
  Origins extends IModule<IModuleRegistry>[],
  Consumer extends IModule<IModuleRegistry>
>
  extends IDynamicModuleBuilder<Supplier, Origins, Consumer>
{
   value: DynamicModule;

   build(): DynamicModule;
}

export function getBuilder<Supplier extends IModule<IModuleRegistry>,
  Origins extends IModule<IModuleRegistry>[],
  Consumer extends IModule<IModuleRegistry>>(
  supplier: Type<Supplier>, origins: IModuleTupleTypes<Origins>,
): IDynamicModuleBuilderImpl<Supplier, Origins, Consumer>
{
   const BUILDER_CTOR: Ctor<DynamicModule, IDynamicModuleBuilderImpl<Supplier, Origins, Consumer>> =
     new Builder<DynamicModule, IDynamicModuleBuilderImpl<Supplier, Origins, Consumer>>()
       .chain(
         'provideValue',
         <Component>
         (provide: ITokenProviding<Supplier, Component>, useValue: Component) =>
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
           provide: ITokenProviding<Supplier, Component>,
           existing: ITokenProviding<UnionizeTuple<Origins>, Component>) =>
           (ctx: DynamicModule): DynamicModule =>
           {
              return provideExisting(ctx, provide, existing);
           },
       )
       //   .chain(
       //     'selectFromConsumer',
       //     <Component>
       //     (
       //       provide: ITokenProviding<Supplier, Component>,
       //       useExisting: ITokenProviding<Consumer, Component>,
       //     ) =>
       //       (ctx: DynamicModule): DynamicModule =>
       //       {
       //          return selectFromConsumer(ctx, provide, useExisting);
       //       },
       //   )
       //   .chain(
       //   'selectFromOther',
       //   <Component, Source extends IModule<IModuleRegistry>>
       //   (
       //     provide: ITokenProviding<Supplier, Component>,
       //     useExisting: ITokenProviding<Source, Component>,
       //     fromModule: Type<Source>,
       //   ) =>
       //     (ctx: DynamicModule): DynamicModule =>
       //     {
       //        return selectFromOther(ctx, provide, fromModule, useExisting);
       //     },
       // )
       // .chain(
       //   'applyFactoryFromConsumer',
       //   <Component, Source extends IModule<IModuleRegistry>>
       //   (
       //     provide: ITokenProviding<Supplier, Component>,
       //     useExisting: ITokenProviding<Source, IFactory<Component, any>>,
       //     inject: ArgsAsInjectableKeys<IFactory<Component, any>, Source>
       //   ) =>
       //     (ctx: DynamicModule): DynamicModule =>
       //     {
       //        return applyFactoryFromConsumer(ctx, provide, useExisting);
       //     },
       // )
       // .chain(
       //   'callFactoryMethod',
       //   <Component extends {}>
       //   (
       //     provide: ITokenProviding<Supplier, Component>,
       //     useFactory: IFactory<Component>,
       //   ) =>
       //     (ctx: DynamicModule): DynamicModule =>
       //     {
       //        return callFactoryMethod(ctx, provide, useFactory);
       //     },
       // )
       .chain(
         'provideByFactoryCall',
         <Component, Factory extends IFactoryMethod<Component, any[]>>
         (provide: ITokenProviding<Supplier, Component>, useFactory: Factory,
          inject: ArgsAsInjectableKeys<Factory, Origins>) =>
           (ctx: DynamicModule): DynamicModule => {
              return provideByFactoryCall(ctx, provide, useFactory, inject);
           },
       )
       // .chain(
       //   'callConsumerFactoryMethod',
       //   <Component, Supplier extends IModule<IModuleRegistry>,
       //     Factory extends IFactoryMethod<Component, any>>
       //   (
       //     provide: ITokenProviding<Supplier, Component>,
       //     useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Consumer>,
       //   ) =>
       //     (ctx: DynamicModule): DynamicModule =>
       //     {
       //        return callConsumerFactoryMethod(ctx, provide, useFactory, inject);
       //     },
       // )
       // .chain(
       //   'callImportableFactoryMethod',
       //   <Component, Supplier extends IModule<IModuleRegistry>,
       //     Source extends IModule<IModuleRegistry>,
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
       .chain(
         'exportFromSupplier',
         <Component extends {}>
         (
           provide: ITokenRequiring<Consumer, Component>,
           existing: ITokenProviding<Supplier, Component>,
         ) =>
           (ctx: DynamicModule): DynamicModule =>
           {
              return exportFromSupplier(provide, existing, ctx);
           },
       )
       .chain('bindProvider', (
         provider: Exclude<Provider, Type<any>>,
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
       )
       .chain(
         'addImportFromConfig',
         <Token extends IToken<Supplier>>
         (importKey: Token, importItem: IBoundDynamicModuleImport<Supplier, Token, Origins>,
          andExport: boolean = false) =>
           (ctx: DynamicModule): DynamicModule => {
              let retVal: DynamicModule;
              switch (importItem.style) {
                 case DynamicProviderBindingStyle.VALUE:
                 {
                    retVal = BuilderUtilityFacade.appendSupplierImportProvider(
                      ctx, {
                         provide: importKey,
                         useValue: importItem.useValue,
                      });
                    break;
                 }
                 case DynamicProviderBindingStyle.CLASS:
                 {
                    retVal = BuilderUtilityFacade.appendSupplierImportProvider(
                      ctx, {
                         provide: importKey,
                         useClass: importItem.useClass,
                      });
                    break;
                 }
                 case DynamicProviderBindingStyle.EXISTING:
                 {
                    retVal = BuilderUtilityFacade.appendSupplierImportProvider(
                      ctx, {
                         provide: importKey,
                         useExisting: importItem.useExisting,
                      });
                    break;
                 }
                // case DynamicProviderBindingStyle.CONSUMER_PROVIDED_FACTORY:
                // {
                //    retVal = applyFactoryFromConsumer(ctx, param.provide, param.useExisting);
                //    break;
                // }
                // case DynamicProviderBindingStyle.SUPPLIER_PROVIDED:
                // {
                //    retVal = selectFromSupplier(ctx, param.provide, param.useExisting);
                //    break;
                // }
                // case DynamicProviderBindingStyle.SUPPLIER_PROVIDED_FACTORY:
                // {
                //    retVal = applyFactoryFromSupplier(ctx, param.provide, param.useExisting);
                //    break;
                // }
                // case DynamicProviderBindingStyle.FACTORY_METHOD_CALL:
                // {
                //    retVal = callFactoryMethod(ctx, param.provide, param.useFactory);
                //    break;
                // }
                 case DynamicProviderBindingStyle.INJECTED_FACTORY:
                 {
                    retVal = BuilderUtilityFacade.appendSupplierImportProvider(
                      ctx, {
                         provide: importKey,
                         useFactory: importItem.useFactory,
                         inject: importItem.inject,
                      },
                    );
                    break;
                 }
                // case DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION:
                // {
                //    retVal = callSupplierFactoryMethod(
                //      ctx,
                //      param.provide,
                //      param.useFactory,
                //      param.inject as ArgsAsInjectableKeys<typeof param.useFactory, Supplier>);
                //    break;
                // }
                 default:
                 {
                    return undefined as never;
                 }
              }

              if (!andExport) {
                 return retVal;
              }

              return {
                 ...retVal,
                 exports: [...retVal.exports!, importKey],
              };
           },
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
         imports: [...origins],
         controllers: [],
         providers: [],
         exports: [],
      },
   );
}

// function callImportableFactoryMethod<Component,
//   Supplier extends IModule<IModuleRegistry>,
//   Source extends IModule<IModuleRegistry>,
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
// function callConsumerFactoryMethod<Component,
//   Supplier extends IModule<IModuleRegistry>,
//   Consumer extends IModule<IModuleRegistry>,
//   Factory extends IFactoryMethod<Component, any>>(
//   ctx: DynamicModule, provide: ITokenProviding<Supplier, Component>,
//   useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Consumer>)
// {
//    return BuilderUtilityFacade.appendConsumerImportProvider(
//      ctx,
//       {
//          provide,
//          useFactory,
//          inject,
//       },
//    );
// }
//
function provideByFactoryCall<Component,
  Supplier extends IModule<IModuleRegistry>,
  Factory extends IFactoryMethod<Component, any[]>
>(
  ctx: DynamicModule, provide: ITokenProviding<Supplier, Component>,
  useFactory: Factory, inject: ArgsAsInjectableKeys<Factory, Supplier>)
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

// function applyFactoryFromConsumer<Component,
//   Supplier extends IModule<IModuleRegistry>,
//   Consumer extends IModule<IModuleRegistry>>(
//   ctx: DynamicModule,
//   provide: ITokenProviding<Supplier, Component>,
//   useExisting: InjectableKey<IFactory<Component>, Consumer>
// )
// {
//    const newProvider: Provider = {
//       provide,
//       useFactory: component => component.create(),
//       inject: [existing],
//    };
//
//    return BuilderUtilityFacade.appendImportableImportProvider(ctx, newProvider, provide);
// }

// function selectFromConsumer<Component, Supplier extends IModule<IModuleRegistry>,
//   Consumer extends IModule<IModuleRegistry>>(
//   ctx: DynamicModule,
//   provide: ITokenProviding<Supplier, Component>,
//   useExisting: ITokenProviding<Consumer, Component>)
// {
//    const newProvider: Provider = {
//       provide,
//       useExisting,
//    };
//
//    return BuilderUtilityFacade.appendConsumerImportProvider(ctx, newProvider);
// }
//
// function selectFromOther<Component, Supplier extends IModule<IModuleRegistry>,
//   Source extends IModule<IModuleRegistry>>(
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

// function applyFactoryFromSupplier<Component, Supplier extends IModule<IModuleRegistry>>(
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

function provideExisting<
  Component, Supplier extends IModule<IModuleRegistry>, Origin extends IModule<IModuleRegistry>
>(
  ctx: DynamicModule,
  provide: ITokenProviding<Supplier, Component>,
  useExisting: ITokenProviding<Origin, Component>)
{
   const newProvider: Provider = {
      provide,
      useExisting,
   };

   return BuilderUtilityFacade.appendSupplierImportProvider(ctx, newProvider);
}

// function provideWithFactoryClass<Component, Supplier extends IModule<IModuleRegistry>>(
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

function provideClass<Component, Supplier extends IModule<IModuleRegistry>>(
  ctx: DynamicModule,
  provide: ITokenProviding<Supplier, Component> | Type<Component>,
  useClass: Type<Component>)
{
   return BuilderUtilityFacade.appendSupplierImportProvider(
     ctx, {
        provide,
        useClass,
     });
}

function provideValue<Component, Supplier extends IModule<IModuleRegistry>>(
  ctx: DynamicModule,
  provide: ITokenProviding<Supplier, Component> | Type<Component>,
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
// interface DynamicModule
// {
//    readonly supplier: DynamicModule;
//    readonly consumer: DynamicModule;
// }

function exportFromSupplier<Component,
  Supplier extends IModule<IModuleRegistry>,
  Consumer extends IModule<IModuleRegistry>>(
  provide: ITokenRequiring<Consumer, Component>,
  useExisting: ITokenProviding<Supplier, Component>,
  ctx: DynamicModule)
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

   static appendConsumerImportProvider(
     ctx: DynamicModule, newProvider: Provider): DynamicModule
   {
      return {
         ...ctx,
         providers: [...ctx.providers!, newProvider],
      };
   }

   static appendOtherImportProvider(
     ctx: DynamicModule, importSource: Type<IModule<IModuleRegistry>>, newProvider: Provider)
   {
      return {
         ...ctx,
         imports: [...ctx.imports!, importSource],
         providers: [...ctx.providers!, newProvider],
      };
   }

   static appendSupplierExportProvider<Component, Consumer extends IModule<IModuleRegistry>>(
     ctx: DynamicModule, newProvider: Provider, provide: ITokenRequiring<Consumer, Component>)
   {
      return {
         ...ctx,
         providers: [...ctx.providers!, newProvider],
         exports: [...ctx.exports!, provide],
      };
   }
}
