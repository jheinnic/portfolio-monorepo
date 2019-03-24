import { ConstructorFor } from 'simplytyped';
import { IModule, VisibleProviderToken } from './provider-token.type';

export type InjectableKey<Component extends {}, Module extends IModule> =
   VisibleProviderToken<Component, Module> | ConstructorFor<Component>;
