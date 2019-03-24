import { ConstructorFor } from 'simplytyped';
import { VisibleProviderToken } from './provider-token.type';

export type InjectableKey<Component extends {}, Module extends string|symbol> =
   VisibleProviderToken<Component, Module> | ConstructorFor<Component>;
