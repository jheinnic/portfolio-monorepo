import { ConstructorFor } from 'simplytyped';

import { AnyMsyncFunc } from '@jchptf/txtypes';
import { ProviderToken } from '../token';
import { ArgsAsInjectableKeys } from './args-as-provider-tokens.type';

export declare type NestProvider<Type, Factory extends undefined|AnyMsyncFunc<Type> = undefined> =
   Factory extends AnyMsyncFunc<Type>
      ? IFactoryProvider<Type, Factory>
      : NonFactoryProvider<Type>;

type NonFactoryProvider<Type> =
   Type extends object
      ? IClassProvider<Type> | IValueProvider<Type> | ConstructorFor<Type>
      : IValueProvider<Type>;

export interface IClassProvider<Type extends object>
{
   provide: ProviderToken<Type>;
   useClass: ConstructorFor<Type>;
}

export interface IValueProvider<Type>
{
   provide: ProviderToken<Type>;
   useValue: Type;
}

export interface IFactoryProvider<Type, Factory extends AnyMsyncFunc<Type>>
{
   provide: ProviderToken<Type>;
   useFactory: Factory;
   inject?: ArgsAsInjectableKeys<Factory>;
}
