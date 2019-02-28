import { MerkleCalculator } from '../merkle-calculator.class';
import { MerkleDigestLocator, MerkleLocatorFactory } from '../locator';
import { CanonicalPathNaming } from '../canonical-path-naming.class';
import { default as LRU } from 'lru-cache';
import {
   MERKLE_DIGEST_LRU_CACHE_LPT, MERKLE_IDENTITY_LRU_CACHE_LPT,
   MERKLE_LOCATOR_FACTORY_LPT, MERKLE_PATH_NAMING_LPT, MERKLE_TREE_CALCULATOR_LPT
} from './merkle.constants';

export const MERKLE_CALCULATOR_LOCAL_PROVIDER = {
   provide: MERKLE_TREE_CALCULATOR_LPT,
   useClass: MerkleCalculator
};

export const MERKLE_LOCATOR_FACTORY_LOCAL_PROVIDER = {
   provide: MERKLE_LOCATOR_FACTORY_LPT,
   useClass: MerkleLocatorFactory
};

export const MERKLE_PATH_NAMING_LOCAL_PROVIDER = {
   provide: MERKLE_PATH_NAMING_LPT,
   useClass: CanonicalPathNaming
};

export const MERKLE_DIGEST_LRU_LOCAL_PROVIDER = {
   provide: MERKLE_DIGEST_LRU_CACHE_LPT,
   useFactory: () => LRU<number, MerkleDigestLocator>(Math.pow(2, 12))
};

export const MERKLE_IDENTITY_LRU_LOCAL_PROVIDER = {
   provide: MERKLE_IDENTITY_LRU_CACHE_LPT,
   useFactory: () => LRU<string, string>(Math.pow(2, 8))
};
