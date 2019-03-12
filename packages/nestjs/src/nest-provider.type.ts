import { ConstructorFor } from 'simplytyped';

import { AsyncTx } from '@jchptf/txtypes';
import { ProviderToken } from './provider-token.type';
import { ArgsAsInjectableKeys } from './args-as-provider-tokens.type';

export declare type NestProvider<Type, Factory extends undefined|AsyncTx<any[], Type> = undefined> =
   Factory extends AsyncTx<any[], Type>
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

export interface IFactoryProvider<Type, Factory extends AsyncTx<any[], Type>>
{
   provide: ProviderToken<Type>;
   useFactory: Factory;
   inject?: ArgsAsInjectableKeys<Factory>;
}
