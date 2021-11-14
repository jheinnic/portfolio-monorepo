import { IModule, GLOBAL_MODULE_ID, MODULE_ID } from '.';

const localTag: unique symbol = Symbol('localTag');

const globalTag: unique symbol = Symbol('globalTag');

class ModuleScopingTags<ModuleId extends symbol, IsGlobal extends 'global' | 'local'>
{
   readonly [localTag]?: ModuleId;

   readonly [globalTag]: IsGlobal;
}

export type GlobalScope =
   ModuleScopingTags<typeof GLOBAL_MODULE_ID, 'global'>;

export type LocalScope<Module extends IModule> =
   ModuleScopingTags<Module[typeof MODULE_ID], 'local'>;
