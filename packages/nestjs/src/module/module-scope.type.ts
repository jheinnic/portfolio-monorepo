import { MODULE_ID } from './constants';
import { IModule } from './module.interface';

const localTag: unique symbol = Symbol('localTag');

const globalTag: unique symbol = Symbol('globalTag');

class ModuleScopingTags<ModuleId extends symbol, IsGlobal extends 'global' | 'local'>
{
   [localTag]?: ModuleId;

   [globalTag]: IsGlobal;
}

export type GlobalScope =
   ModuleScopingTags<any, 'global'>;

export type LocalScope<Module extends IModule> =
   ModuleScopingTags<Module[typeof MODULE_ID], 'local'>;
