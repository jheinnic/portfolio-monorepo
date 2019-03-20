import { ConstructorFor } from 'simplytyped';
import { AnyMsyncFunc, NoArgsMsyncFunc } from '@jchptf/txtypes';
import { IFactory } from '@jchptf/api';

import { InjectableKey } from '../token';
import { ArgsAsInjectableKeys } from './args-as-provider-tokens.type';

export type NestProvider<Type> =
   IClassProvider<Type> | (Type extends object ? ConstructorFor<Type> : never) |
   IValueProvider<Type> | IExistingProvider<Type> |
   IFactoryProvider<Type> | IFactoryClassProvider<Type> |
   IExistingFactoryClassProvider<Type>;

export interface IClassProvider<Type>
{
   provide: Type extends object ? InjectableKey<Type> : never;
   useClass: Type extends object ? ConstructorFor<Type> : never;
}

export interface IValueProvider<Type>
{
   provide: InjectableKey<Type>;
   useValue: Type;
}

export type IFactoryProvider<Type> =
   IFactoryProviderWithArgs<Type> | IFactoryProviderNoArgs<Type>;

export interface IFactoryProviderWithArgs<Type>
{
   provide: InjectableKey<Type>;
   useFactory: AnyMsyncFunc<Type>;
   inject: ArgsAsInjectableKeys<this['useFactory']>;
}

interface IFactoryProviderNoArgs<Type>
{
   provide: InjectableKey<Type>;
   useFactory: NoArgsMsyncFunc<Type>;
}

export interface IExistingProvider<Type>
{
   provide: InjectableKey<Type>;
   useExisting: InjectableKey<Type>;
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
export interface IFactoryClassProvider<Type>
{
   provide: InjectableKey<Type>;
   useFactoryClass: ConstructorFor<IFactory<Type>>;
}

export interface IExistingFactoryClassProvider<Type>
{
   provide: InjectableKey<Type>;
   useExistingFactory: InjectableKey<IFactory<Type>>;
}
