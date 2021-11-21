import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { UnionizeTuple } from 'simplytyped';

import { IFactoryMethod } from '@jchptf/api';

import {IHasRegistry, IModule, IModuleRegistry, ITokenProviding, ITokenRequiring} from './module';
import { ArgsAsInjectableKeys } from './injectable-key';
import {Insert} from "@jchptf/tupletypes";

export interface IDynamicModuleBuilder<
   Supplier extends IModule<IModuleRegistry>,
   Origins extends [...IHasRegistry[]],
   Consumer extends IModule<IModuleRegistry>>
{
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
      provide: ITokenRequiring<Supplier, Component>,
      value: Component,
   ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   provideClass<Component>(
      provide: ITokenRequiring<Supplier, Component>,
      clazz: Type<Component>,
   ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   provideExisting<Component>(
      provide: ITokenRequiring<Supplier, Component>,
      existing: ITokenProviding<UnionizeTuple<Origins>, Component>,
   ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   provideByFactoryCall<Component, Args extends any[],
     Factory extends IFactoryMethod<Component, Args>>(
      provide: ITokenRequiring<Supplier, Component>,
      useFactory: Factory,
      inject: ArgsAsInjectableKeys<Factory, Insert<Origins, 0, Consumer>>,
   ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   // callImportableFactoryMethod<
   //   Component, Source extends IModule<IModuleRegistry>,
   //   Factory extends IFactoryMethod<Component, any>
   // >(
   //    provide: ITokenProviding<Supplier, Component>,
   //    source: Type<Source>,
   // ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;
   //
   // callSupplierFactoryMethod<
   //    Component, Factory extends IFactoryMethod<Component, any>
   // >(
   //    provide: ITokenProviding<Supplier, Component>,
   //    useFactory: Factory,
   //    inject: ArgsAsInjectableKeys<Factory, Supplier>,
   // ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;
   //
   callConsumerFactoryMethod<
      Component, Factory extends IFactoryMethod<Component, any>>
   (
      provide: ITokenProviding<Supplier, Component>,
      useFactory: Factory,
      inject: ArgsAsInjectableKeys<Factory, Insert<Origins, 0, Consumer>>,
   ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   exportFromSupplier<Component>(
      provide: ITokenRequiring<Consumer, Component>,
      existing: ITokenProviding<Supplier, Component>,
   ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   import(
     source: Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference,
     alsoExport?: boolean,
   ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   // imports(
   //   imports?: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference)[],
   //   alsoExportAll?: boolean,
   // ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   controller(source: Type<any>): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   controllers(sources?: Type<any>[]): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   // provideWithFactoryClass<Component extends {}>(
   //    provide: ITokenProviding<Supplier, Component>,
   //    provideFactory: InjectableKey<IFactoryObject<Component>, Supplier>,
   //    clazz: Type<IFactoryObject<Component>>,
   // ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   // applyFactoryFromSupplier<Component extends {}>(
   //    provide: ITokenProviding<Supplier, Component>,
   //    existing: InjectableKey<IFactory<Component>, Supplier>,
   // ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   // applyFactoryFromConsumer<Component extends {}>(
   //    provide: ITokenProviding<Supplier, Component>,
   //    existing: InjectableKey<IFactory<Component>, Consumer>,
   // ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

   // acceptBoundImport<Component>(
   //    importKey: ITokenRequiring<Supplier, Component>,
   //    boundParam: IBoundDynamicModuleImport<Component, Supplier, UnionizeTuple<Origins>>,
   //    andExport?: boolean,
   // ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;

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
   ): IDynamicModuleBuilder<Supplier, Origins, Consumer>;
    */
}
