import { ConstructorFor } from 'simplytyped';
import { AnyMsyncFunc, NoArgsMsyncFunc } from '@jchptf/txtypes';
import { IFactory } from '@jchptf/api';

import { InjectableKey, ProviderToken } from '../token';
import { ArgsAsInjectableKeys } from './args-as-provider-tokens.type';

export type NestProvider =
   IClassProvider | ConstructorFor<any> |
   IValueProvider | IExistingProvider |
   IFactoryProvider | IFactoryClassProvider |
   IExistingFactoryClassProvider;

export interface IClassProvider
{
   provide: ProviderToken<any>;
   useClass: this['provide'] extends ProviderToken<infer Type>
      ? Type extends object
         ? ConstructorFor<Type> : never
      : never;
}

export interface IValueProvider
{
   provide: ProviderToken<any>;
   useValue: this['provide'] extends ProviderToken<infer Type> ? Type : never;
}

export type IFactoryProvider =
   IFactoryProviderWithArgs | IFactoryProviderNoArgs;

export interface IFactoryProviderWithArgs
{
   provide: ProviderToken<any>;
   useFactory: this['provide'] extends ProviderToken<infer Type> ? AnyMsyncFunc<Type> : never;
   inject: ArgsAsInjectableKeys<this['useFactory']>;
}

interface IFactoryProviderNoArgs
{
   provide: ProviderToken<any>;
   useFactory: this['provide'] extends ProviderToken<infer Type> ? NoArgsMsyncFunc<Type> : never;
}

export interface IExistingProvider
{
   provide: ProviderToken<any>;
   useExisting: this['provide'] extends ProviderToken<infer Type> ? InjectableKey<Type> : never;
}

/**
 * Similar to the ClassProvider, IFactoryClassProvider asks the user to provide the type of
 * an @Injectable marked class.  The instantiated class must implement IFactory<Type> for
 * the provided type.  It is used in a way similar to the way a FactoryProvider is used,
 * except the only means for injecting parameters into a FactoryClass is by virtue
 * of other providers visible to the binding module and @Inject tags marking the constructor
 * of the factory class.  Unlike a FactoryProvider, there is no need for an array of DI
 * tokens passed through an "inject" property.
 *
 * If the same Factory Class is used with more than one ClassProvider, it will be instantiated
 * and DI-injected once per unique occurrence.  When these instances occur in different modules,
 * the different sets of module visibility will be the primary force driving any differences in
 * the artifacts produced, which will only be available to modules that see or
 * import the provider tokens bound in those two distinct scenarios.
 */
export interface IFactoryClassProvider
{
   provide: ProviderToken<any>;
   useFactoryClass: this['provide'] extends ProviderToken<infer Type>
      ? ConstructorFor<IFactory<Type>> : never;
}

export interface IExistingFactoryClassProvider
{
   provide: ProviderToken<any>;
   useExistingFactoryClass: this['provide'] extends ProviderToken<infer Type>
      ? InjectableKey<IFactory<Type>> : never;
}
