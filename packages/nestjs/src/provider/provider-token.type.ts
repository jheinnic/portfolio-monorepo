import { Nominal } from '@jchptf/api';

import { GlobalScope, LocalScope, IModule } from '../module';

// Base abstraction.  Treat as abstract.
export type ProviderToken<Component extends {}, Value = string|symbol> =
   Nominal<Value, 'ProviderToken', Component>;

// Use these for allocations
export type GlobalProviderToken<Component extends {}, Value = string|symbol> =
   ProviderToken<Component, Value> & GlobalScope;

export type LocalProviderToken
   <Component extends {}, Module extends IModule, Value = string|symbol> =
   ProviderToken<Component, Value> & LocalScope<Module>;

// Use this for parameter binding
export type VisibleProviderToken
   <Component extends {}, Module extends IModule, Value = string|symbol> =
   // LocalProviderToken<Component, Module, Value> | GlobalProviderToken<Component, Value>;
   ProviderToken<Component, Value> & (LocalScope<Module> | GlobalScope);
