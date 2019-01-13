import { getDynamicProviderToken, ModuleIdentifier, TypeIdentifier } from '@jchptf/api';
import { CONFIG_MODULE_DYNAMIC_PROVIDER_BINDING } from './config.constants';

export function getConfigClassProviderToken<ConfigClass extends object>(
   moduleId: ModuleIdentifier, typeId: TypeIdentifier<ConfigClass>
) {
   return getDynamicProviderToken(moduleId, CONFIG_MODULE_DYNAMIC_PROVIDER_BINDING, typeId);
}