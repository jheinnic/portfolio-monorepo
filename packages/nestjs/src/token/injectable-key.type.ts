import { ConstructorFor } from 'simplytyped';
import { ProviderToken } from './provider-token.type';

export type InjectableKey<T> =
   ProviderToken<T> | (T extends object ? ConstructorFor<T> : never);
