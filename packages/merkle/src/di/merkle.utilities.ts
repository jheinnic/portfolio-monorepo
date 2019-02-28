import { getDynamicProviderToken, ModuleIdentifier } from '@jchptf/api';
import {
   MERKLE_TREE_CALCULATOR_TYPE, MERKLE_LOCATOR_FACTORY_TYPE, MERKLE_MODULE_DYNAMIC_PROVIDER_BINDING,
   MERKLE_PATH_NAMING_TYPE
} from './merkle.constants';

export function getMerkleCalculatorProviderToken(
   moduleId: ModuleIdentifier, tagQualifier: string
)
{
   return getDynamicProviderToken(
      moduleId, MERKLE_MODULE_DYNAMIC_PROVIDER_BINDING, MERKLE_TREE_CALCULATOR_TYPE, tagQualifier);
}

export function getMerkleLocatorFactoryProviderToken(
   moduleId: ModuleIdentifier, tagQualifier: string
)
{
   return getDynamicProviderToken(
      moduleId, MERKLE_MODULE_DYNAMIC_PROVIDER_BINDING, MERKLE_LOCATOR_FACTORY_TYPE, tagQualifier);
}

export function getMerklePathNamingProviderToken(
   moduleId: ModuleIdentifier, tagQualifier: string
)
{
   return getDynamicProviderToken(
      moduleId, MERKLE_MODULE_DYNAMIC_PROVIDER_BINDING, MERKLE_PATH_NAMING_TYPE, tagQualifier);
}

