import { Nominal } from '@jchptf/api';
import { ModuleIdentifier } from './module-identifier.type';

// export const GLOBAL = 'GlobalModule';

export const localTag: unique symbol = Symbol('localTag');
export const globalTag: unique symbol = Symbol('globalTag');

export class ModuleScopingTags<ModuleId extends ModuleIdentifier,
   IsGlobal extends 'global' | 'local'>
{
   [localTag]?: ModuleId;

   [globalTag]: IsGlobal;
}

// Scope building blocks.
export type GlobalScope = ModuleScopingTags<string, 'global'>;
export type LocalScope<Module extends ModuleIdentifier> = ModuleScopingTags<Module, 'local'>;

// Base abstraction.  Treat as abstract.
export type ProviderToken<Token extends symbol | string, Component extends {}> =
   Nominal<Token, 'ProviderToken', Component>
// StringQualifier<'ProviderToken', Component> |
// SymbolQualifier<'ProviderToken', Component>
;

// Use these for allocations
export type GlobalProviderToken<
   Component extends {}, Token extends symbol | string = symbol| string
> =
   ProviderToken<Token, Component> & GlobalScope;

export type LocalProviderToken<
   Component extends {},
   Module extends ModuleIdentifier,
   Token extends symbol | string = symbol|string,
> =
   ProviderToken<Token, Component> & LocalScope<Module>;

// Use this for parameter binding
export type VisibleProviderToken<Component extends {}, Module extends ModuleIdentifier> =
   ProviderToken<symbol | string, Component> & (LocalScope<Module> | GlobalScope);
