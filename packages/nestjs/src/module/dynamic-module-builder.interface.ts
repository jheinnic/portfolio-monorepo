import { NestProvider } from '../provider';
import { InjectableKey } from '../token';
import { DynamicModule, ForwardReference, Type } from '@nestjs/common';

export interface IDynamicModuleBuilder
{
   /**
    * An input provider is passed to one of a Module's static constructor methods and is intended
    * to support dependencies provided from the context of the calling module that will import
    * the Dynamic Module under construction.  The dependencies come from the context of that
    * module, but the provided token should be from the constants file of the host module that
    * will build the Dynamic Module under construction.  The builder construct will take care of
    * details to ensure that the provided artifact is produced in the context of the dynamic
    * module using the relevant dependencies from the consuming module.
    *
    * @param inputProvider
    */
   bindInputProvider<Type>(inputProvider: NestProvider<Type>): IDynamicModuleBuilder;

   /**
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
    */
   bindProvider<Type>(
      provider: NestProvider<Type>,
      exportAs?: InjectableKey<Type> | boolean,
   ): IDynamicModuleBuilder;

   /*
    * A convenience method for adding multiple Providers, given that none of them need to be
    * exported.  Each Provider is defined from the context of the Dynamic Module or its extended
    * module type.
    *
    * @param providers
   bindProviders(
      providers: NestProvider[],
   ): IDynamicModuleBuilder;
    */

   import(
      source: Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference,
      alsoExport?: boolean,
   ): IDynamicModuleBuilder;

   imports(
      imports?: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference)[],
      alsoExportAll?: boolean,
   ): IDynamicModuleBuilder;

   controller(source: Type<any>): IDynamicModuleBuilder;

   controllers(imports?: Type<any>[]): IDynamicModuleBuilder;
}
