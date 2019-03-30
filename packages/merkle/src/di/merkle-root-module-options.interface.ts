// import { default as LRU } from 'lru-cache';

import { DynamicModuleConfigTwo, IBaseConfigProps, IModule } from '@jchptf/nestjs';

import {
   MerkleModuleId, MERKLE_TREE_DESCRIPTION, MERKLE_TREE_CALCULATOR,
   MERKLE_PATH_NAMING, MERKLE_DIGEST_LRU_CACHE, MERKLE_IDENTITY_LRU_CACHE,
} from './merkle.constants';

// interface IMerkleImportOptions {
//    [MERKLE_TREE_DESCRIPTION]: IMerkleTreeDescription;
//    [MERKLE_DIGEST_LRU_CACHE]?: LRU.Cache<number, MerkleDigestLocator>;
//    [MERKLE_IDENTITY_LRU_CACHE]?: LRU.Cache<string, string>;
// }

// interface IMerkleExportOptions {
//    [MERKLE_PATH_NAMING]?: ICanonicalPathNaming,
//    [MERKLE_TREE_CALCULATOR]?: IMerkleCalculator,
// }

export type MerkleRootModuleOptions<Consumer extends IModule> = DynamicModuleConfigTwo<
   typeof MerkleModuleId,
   IBaseConfigProps<Consumer>,
   MerkleModuleId,
   typeof MERKLE_TREE_DESCRIPTION,
   typeof MERKLE_DIGEST_LRU_CACHE | typeof MERKLE_IDENTITY_LRU_CACHE,
   typeof MERKLE_PATH_NAMING | typeof MERKLE_TREE_CALCULATOR
>;
