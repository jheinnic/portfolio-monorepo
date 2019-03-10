import { getDynamicProviderToken, ModuleIdentifier, TypeIdentifier } from '@jchptf/nestjs';
import { CONFIG_DYNAMIC_MODULE_TYPE } from './config.constants';

export function getConfigClassProviderToken<ConfigClass extends object>(
   moduleId: ModuleIdentifier, typeId: TypeIdentifier<ConfigClass>,
) {
   return getDynamicProviderToken(moduleId, CONFIG_DYNAMIC_MODULE_TYPE, typeId);
}
