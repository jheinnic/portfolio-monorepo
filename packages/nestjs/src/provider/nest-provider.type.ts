import { ConstructorFor } from 'simplytyped';
import { AnyMsyncFunc, NoArgsMsyncFunc } from '@jchptf/txtypes';
import { ProviderToken } from '../token';
import { ArgsAsInjectableKeys } from './args-as-provider-tokens.type';
import { IFactory } from '@jchptf/api';

export type NestProvider<Type> =
   Type extends object
      ? IClassProvider<Type> | ConstructorFor<Type> |
        IValueProvider<Type> | IExistingProvider<Type> |
        IFactoryProvider<Type> | IFactoryClassProvider<Type>
      : IValueProvider<Type> | IExistingProvider<Type> |
        IFactoryProvider<Type> | IFactoryClassProvider<Type>;

export interface IClassProvider<Type extends object> {
   provide: ProviderToken<Type>;
   useClass: ConstructorFor<Type>;
}

export interface IValueProvider<Type> {
   provide: ProviderToken<Type>;
   useValue: Type;
}

export type IFactoryProvider<Type> =
   IFactoryProviderWithArgs<Type> | IFactoryProviderNoArgs<Type>;

export interface IFactoryProviderWithArgs<Type> {
   provide: ProviderToken<Type>;
   useFactory: AnyMsyncFunc<Type>;
   inject: ArgsAsInjectableKeys<this['useFactory']>;
}

interface IFactoryProviderNoArgs<Type> {
   provide: ProviderToken<Type>;
   useFactory: NoArgsMsyncFunc<Type>;
}

export interface IExistingProvider<Type> {
   useExisting: ProviderToken<Type> | (Type extends object ? ConstructorFor<Type> : never);
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
export interface IFactoryClassProvider<Type> {
   provide: ProviderToken<Type>;
   useFactoryClass: ConstructorFor<IFactory<Type>>;
}
