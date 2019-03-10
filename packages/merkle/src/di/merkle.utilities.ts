import { DynamicProviderToken, getDynamicProviderToken, ModuleIdentifier } from '@jchptf/nestjs';
import {
   MERKLE_TREE_CALCULATOR_TYPE, MERKLE_LOCATOR_FACTORY_TYPE, MERKLE_DYNAMIC_MODULE_TYPE,
   MERKLE_PATH_NAMING_TYPE
} from './merkle.constants';
import { ICanonicalPathNaming, IMerkleCalculator, IMerkleLocatorFactory } from '../interface';

export function getMerkleCalculatorProviderToken(
   moduleId: ModuleIdentifier, tagQualifier: string
): DynamicProviderToken<IMerkleCalculator>
{
   return getDynamicProviderToken(
      moduleId, MERKLE_DYNAMIC_MODULE_TYPE, MERKLE_TREE_CALCULATOR_TYPE, tagQualifier);
}

export function getMerkleLocatorFactoryProviderToken(
   moduleId: ModuleIdentifier, tagQualifier: string
): DynamicProviderToken<IMerkleLocatorFactory>
{
   return getDynamicProviderToken(
      moduleId, MERKLE_DYNAMIC_MODULE_TYPE, MERKLE_LOCATOR_FACTORY_TYPE, tagQualifier);
}

export function getMerklePathNamingProviderToken(
   moduleId: ModuleIdentifier, tagQualifier: string
): DynamicProviderToken<ICanonicalPathNaming>
{
   return getDynamicProviderToken(
      moduleId, MERKLE_DYNAMIC_MODULE_TYPE, MERKLE_PATH_NAMING_TYPE, tagQualifier);
}
