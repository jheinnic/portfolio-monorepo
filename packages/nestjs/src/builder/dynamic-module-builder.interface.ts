import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { IFactory } from '@jchptf/api';

import { IModule } from '../module';
import { ArgsAsInjectableKeys, InjectableKey, FactoryMethod } from '../provider';
import { IBoundDynamicModuleImport } from './bound-dynamic-module-import.type';

export interface IDynamicModuleBuilder<
   Supplier extends IModule, Consumer extends IModule>
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

   provideValue<Component extends {}>(
      provide: InjectableKey<Component, Supplier>,
      value: Component,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   provideClass<Component extends {}>(
      provide: InjectableKey<Component, Supplier>,
      clazz: Type<Component>,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   provideWithFactoryClass<Component extends {}>(
      provide: InjectableKey<Component, Supplier>,
      provideFactory: InjectableKey<IFactory<Component>, Supplier>,
      clazz: Type<IFactory<Component>>,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   selectFromSupplier<Component extends {}>(
      provide: InjectableKey<Component, Supplier>,
      existing: InjectableKey<Component, Supplier>,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   applyFactoryFromSupplier<Component extends {}>(
      provide: InjectableKey<Component, Supplier>,
      existing: InjectableKey<IFactory<Component>, Supplier>,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   selectFromConsumer<Component extends {}>(
      provide: InjectableKey<Component, Supplier>,
      existing: InjectableKey<Component, Consumer>,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   applyFactoryFromConsumer<Component extends {}>(
      provide: InjectableKey<Component, Supplier>,
      existing: InjectableKey<IFactory<Component>, Consumer>,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   callFactoryMethod<Component extends {}>(
      provide: InjectableKey<Component, Supplier>,
      useFactory: (() => Component) | (() => Promise<Component>),
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   callSupplierFactoryMethod<Component extends {}, Factory extends FactoryMethod<Component>>(
      provide: InjectableKey<Component, Supplier>,
      useFactory: Factory,
      inject: ArgsAsInjectableKeys<Factory, Supplier>,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   callConsumerFactoryMethod<Component extends {}, Factory extends FactoryMethod<Component>>(
      provide: InjectableKey<Component, Supplier>,
      useFactory: Factory,
      inject: ArgsAsInjectableKeys<Factory, Consumer>,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   exportFromSupplier<Component extends {}>(
      provide: InjectableKey<Component, Consumer>,
      existing: InjectableKey<Component, Supplier>,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   acceptBoundImport<Component extends {}>(
      boundParam: IBoundDynamicModuleImport<Component, Supplier, Consumer>,
      andExport?: boolean,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

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
   ): IDynamicModuleBuilder<Supplier, Consumer>;
    */

   import(
      source: Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference,
      alsoExport?: boolean,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   imports(
      imports?: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference)[],
      alsoExportAll?: boolean,
   ): IDynamicModuleBuilder<Supplier, Consumer>;

   controller(source: Type<any>): IDynamicModuleBuilder<Supplier, Consumer>;

   controllers(sources?: Type<any>[]): IDynamicModuleBuilder<Supplier, Consumer>;
}