import * as LRU from 'lru-cache';

import { blessLocalProviderToken, LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';

import { ICanonicalPathNaming, IMerkleCalculator, IMerkleLocatorFactory } from '../interface';
import { MerkleDigestLocator, MerkleTreeDescription } from '../locator';

export const MERKLE_MODULE_ID = Symbol('@jchptf/merkle');

export const MERKLE_TREE_DESCRIPTION = Symbol('MerkleTreeDescription');
export const MERKLE_TREE_CALCULATOR = Symbol('IMerkleCalculator');
export const MERKLE_LOCATOR_FACTORY = Symbol('IMerkleLocatorFactory');
export const MERKLE_PATH_NAMING = Symbol('ICanonicalPathNaming');
export const MERKLE_DIGEST_LRU_CACHE = Symbol('LRU.Cache<number, MerkleDigestLocator>');
export const MERKLE_IDENTITY_LRU_CACHE = Symbol('LRU.Cache<string, string>');

export class MerkleModuleId
{
   public static readonly [MODULE_ID] = MERKLE_MODULE_ID;

   [MERKLE_TREE_DESCRIPTION]: MerkleTreeDescription;
   [MERKLE_TREE_CALCULATOR]: IMerkleCalculator;
   [MERKLE_LOCATOR_FACTORY]: IMerkleLocatorFactory;
   [MERKLE_PATH_NAMING]: ICanonicalPathNaming;
   [MERKLE_DIGEST_LRU_CACHE]: LRU.Cache<number, MerkleDigestLocator>;
   [MERKLE_IDENTITY_LRU_CACHE]: LRU.Cache<string, string>;
}

function blessLocal<Token extends keyof MerkleModuleId>(
   token: Token,
): LocalProviderToken<MerkleModuleId[Token], typeof MerkleModuleId, Token>
{
   return blessLocalProviderToken(token, MerkleModuleId);
}

export const MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN =
   blessLocal(MERKLE_TREE_DESCRIPTION);
export const MERKLE_CALCULATOR_PROVIDER_TOKEN =
   blessLocal(MERKLE_TREE_CALCULATOR);
export const MERKLE_LOCATOR_FACTORY_PROVIDER_TOKEN =
   blessLocal(MERKLE_LOCATOR_FACTORY);
export const MERKLE_PATH_NAMING_PROVIDER_TOKEN =
   blessLocal(MERKLE_PATH_NAMING);
export const MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN =
   blessLocal(MERKLE_DIGEST_LRU_CACHE);
export const MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN =
   blessLocal(MERKLE_IDENTITY_LRU_CACHE);
