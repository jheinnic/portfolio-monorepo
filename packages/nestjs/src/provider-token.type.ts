import { Nominal } from '@jchptf/api';
import { Type } from '@nestjs/common';

// export const GLOBAL = 'GlobalModule';
export const MODULE_ID = Symbol('moduleId');
export interface IModule extends Type<any> {
   [MODULE_ID]: symbol;
}

export const localTag: unique symbol = Symbol('localTag');
export const globalTag: unique symbol = Symbol('globalTag');

export class ModuleScopingTags<ModuleId extends symbol, IsGlobal extends 'global' | 'local'>
{
   [localTag]?: ModuleId;

   [globalTag]: IsGlobal;
}

// Scope building blocks.
export type GlobalScope = ModuleScopingTags<any, 'global'>;
export type LocalScope<Module extends IModule> =
   ModuleScopingTags<Module[typeof MODULE_ID], 'local'>;

// Base abstraction.  Treat as abstract.
export type ProviderToken<Component extends {}> =
   Nominal<string|symbol, 'ProviderToken', Component>
;
// Use these for allocations
export type GlobalProviderToken<Component extends {}> =
   ProviderToken<Component> & GlobalScope;

export type LocalProviderToken<Component extends {}, Module extends IModule> =
   ProviderToken<Component> & LocalScope<Module>;

// Use this for parameter binding
export type VisibleProviderToken<Component extends {}, Module extends IModule> =
   ProviderToken<Component> & (LocalScope<Module> | GlobalScope);
