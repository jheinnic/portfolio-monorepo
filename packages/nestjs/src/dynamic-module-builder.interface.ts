import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { UnionizeTuple } from 'simplytyped';

import { IFactoryMethod } from '@jchptf/api';

import {ITokenProviding, ITokenConsuming, IHaveRegistries, IModule, IToken} from './module';
import { ArgsAsInjectableKeys } from './injectable-key';
import { Insert } from "@jchptf/tupletypes";

export interface IDynamicModuleBuilder<
   Supplier extends IModule<never>, Imported extends IHaveRegistries, Origin extends IModule<never>
> {
   /*
    * An input provider is passed to one of a Module's static constructor methods and is intended
    * to support dependencies provided from the context of the calling module that will import
    * the Dynamic Module under construction.  The dependencies come from the context of that
    * module, but the provided token should be from the constants file of the host module that
    * will build the Dynamic Module under construction.  The builder construct will take care of
    * details to ensure that the provided artifact is produced in the context of the dynamic
    * module using the relevant dependencies from the consuming module.
    */
   // bindInputProvider<Component extends {}>(
   //    inputProvider: NestProvider<Component>): IDynamicModuleBuilder;

   provideValue<Component>(
      provide: ITokenConsuming<Supplier, Component>,
      value: Component,
   ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   provideClass<Component>(
      provide: ITokenConsuming<Supplier, Component>,
      clazz: Type<Component>,
   ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   provideExisting<Component>(
      provide: ITokenConsuming<Supplier, Component>,
      existing: ITokenProviding<UnionizeTuple<Imported>, Component>,
   ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   provideByFactoryCall<Component, Args extends any[],
     Factory extends IFactoryMethod<Component, Args>>(
      provide: ITokenConsuming<Supplier, Component>,
      useFactory: Factory,
      inject: ArgsAsInjectableKeys<Factory, Insert<Imported, 0, Origin>>,
   ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   // callImportableFactoryMethod<
   //   Component, Source extends IModule<IModuleRegistry>,
   //   Factory extends IFactoryMethod<Component, any>
   // >(
   //    provide: ITokenProviding<Supplier, Component>,
   //    source: Type<Source>,
   // ): IDynamicModuleBuilder<Supplier, Imported, Origin>;
   //
   // callSupplierFactoryMethod<
   //    Component, Factory extends IFactoryMethod<Component, any>
   // >(
   //    provide: ITokenProviding<Supplier, Component>,
   //    useFactory: Factory,
   //    inject: ArgsAsInjectableKeys<Factory, Supplier>,
   // ): IDynamicModuleBuilder<Supplier, Imported, Origin>;
   //
   callOriginFactoryMethod<
      Component, Args extends any[], Factory extends IFactoryMethod<Component, Args>>
   (
      provide: ITokenProviding<Supplier, Component>,
      useFactory: Factory,
      inject: ArgsAsInjectableKeys<Factory, Insert<Imported, 0, Origin>>,
   ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   exportFromSupplier<Component>(
      provide: ITokenConsuming<Origin, Component>,
      existing: ITokenProviding<Supplier, Component>,
   ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   import(
     source: Type<IModule<never>> | DynamicModule | Promise<DynamicModule> | ForwardReference,
     alsoExport?: boolean,
   ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   // imports(
   //   imports?: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference)[],
   //   alsoExportAll?: boolean,
   // ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   controller(source: IToken<never> | Type<never>): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   controllers(sources?: [...(IToken<never> | Type<never>)[]]): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   // provideWithFactoryClass<Component extends {}>(
   //    provide: ITokenProviding<Supplier, Component>,
   //    provideFactory: InjectableKey<IFactoryObject<Component>, Supplier>,
   //    clazz: Type<IFactoryObject<Component>>,
   // ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   // applyFactoryFromSupplier<Component extends {}>(
   //    provide: ITokenProviding<Supplier, Component>,
   //    existing: InjectableKey<IFactory<Component>, Supplier>,
   // ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   // applyFactoryFromOrigin<Component extends {}>(
   //    provide: ITokenProviding<Supplier, Component>,
   //    existing: InjectableKey<IFactory<Component>, Origin>,
   // ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   // acceptBoundImport<Component>(
   //    importKey: ITokenRequiring<Supplier, Component>,
   //    boundParam: IBoundDynamicModuleImport<Component, Supplier, UnionizeTuple<Imported>>,
   //    andExport?: boolean,
   // ): IDynamicModuleBuilder<Supplier, Imported, Origin>;

   /*
    * Adds a provider with dependencies from context of the Dynamic Module or its extended module
    * type.  The provider is visible to the dynamic module itself, and optionally to the calling
    * module that will import dynamic module once built.  If a second argument is not provided,
    * visibility is limited to the dynamic module.  Otherwise, the second argument is either the
    * a different token to use for export that was supplied by the calling module, or a boolean
    * value of true, in which case the token from the Provider is exported as-is (which may still
    * be a caller-provided token in the event that the Dynamic Module itself contains no
    * dependencies on the provided artifact and simply defines it up front using caller-supplied
    * token.)
    *
    * @param provider A provided structure to be added in the context of Dynamic Module under
    * construction.
    * @param exportAs An optional boolean flag or ProviderToken that determines whether or not
    * supplied Provider is exported.
   bindProvider(
      provider: Exclude<Provider, Type<any>>,
      withExport: boolean,
   ): IDynamicModuleBuilder<Supplier, Imported, Origin>;
    */
}
