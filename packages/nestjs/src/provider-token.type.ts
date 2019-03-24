import { StringQualifier, SymbolQualifier } from '@jchptf/api';
import { ModuleIdentifier } from './module-identifier.type';

// export const GLOBAL = 'GlobalModule';

export const localTag: unique symbol = Symbol('localTag');
export const globalTag: unique symbol = Symbol('globalTag');

export class ModuleScopingTags<
   ModuleId extends ModuleIdentifier,
   IsGlobal extends 'global' | 'local'
>
{
   [localTag]?: ModuleId;
   [globalTag]: IsGlobal;
}

// Scope building blocks.
export type GlobalScope = ModuleScopingTags<string, 'global'>;
export type LocalScope<Module extends ModuleIdentifier> = ModuleScopingTags<Module, 'local'>;

// Base abstraction.  Treat as abstract.
export type ProviderToken<Component extends {}> =
   StringQualifier<'ProviderToken', Component> |
   SymbolQualifier<'ProviderToken', Component>
   ;

// Use these for allocations
export type GlobalProviderToken<Component extends {}> =
   ProviderToken<Component> & GlobalScope;

export type LocalProviderToken<Component extends {}, Module extends ModuleIdentifier> =
   ProviderToken<Component> & LocalScope<Module>;

// Use this for parameter binding
export type VisibleProviderToken<Component extends {}, Module extends ModuleIdentifier> =
   ProviderToken<Component> & (LocalScope<Module> | GlobalScope);
