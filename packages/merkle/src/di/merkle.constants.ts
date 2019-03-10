import {
   getDynamicModuleType, getLocalProviderToken, getModuleIdentifier, getNamedTypeIntent,
} from '@jchptf/nestjs';
import { ICanonicalPathNaming, IMerkleCalculator, IMerkleLocatorFactory } from '../interface';
import { default as LRU } from 'lru-cache';

export const MERKLE_MODULE_ID = getModuleIdentifier('@jchptf/config');

export const MERKLE_TREE_CALCULATOR_TYPE =
   getNamedTypeIntent<IMerkleCalculator>('MerkleCalculator');
export const MERKLE_LOCATOR_FACTORY_TYPE =
   getNamedTypeIntent<IMerkleLocatorFactory>('MerkleLocatorFactory');
export const MERKLE_PATH_NAMING_TYPE =
   getNamedTypeIntent<ICanonicalPathNaming>('CanonicalPathNaming');
const LRUC = getNamedTypeIntent<LRU>('LRUCache');

export const MERKLE_TREE_CALCULATOR_LPT =
   getLocalProviderToken<IMerkleCalculator>(MERKLE_MODULE_ID, MERKLE_TREE_CALCULATOR_TYPE);
export const MERKLE_LOCATOR_FACTORY_LPT =
   getLocalProviderToken<IMerkleLocatorFactory>(MERKLE_MODULE_ID, MERKLE_LOCATOR_FACTORY_TYPE);
export const MERKLE_PATH_NAMING_LPT =
   getLocalProviderToken<ICanonicalPathNaming>(MERKLE_MODULE_ID, MERKLE_PATH_NAMING_TYPE);
export const MERKLE_IDENTITY_LRU_CACHE_LPT =
   getLocalProviderToken<LRU>(MERKLE_MODULE_ID, LRUC);
export const MERKLE_DIGEST_LRU_CACHE_LPT =
   getLocalProviderToken<LRU>(MERKLE_MODULE_ID, LRUC);

export const MERKLE_DYNAMIC_MODULE_TYPE =
   getDynamicModuleType(MERKLE_MODULE_ID);
