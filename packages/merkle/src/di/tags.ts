import {SymbolEnum} from '@jchptf/api';

type MerkleTagKeys = 'LRUCacheType' | 'ContentDomain';

export const MERKLE_TAG_KEYS: SymbolEnum<MerkleTagKeys> = {
   LRUCacheType: Symbol.for('LRUCacheType'),
   ContentDomain: Symbol.for('ContentDomain')
};

type MerkleCacheTypes = 'Digest' | 'Identity';

export const MERKLE_CACHE_TYPES: SymbolEnum<MerkleCacheTypes> = {
   Digest: Symbol.for('Digest'),
   Identity: Symbol.for('Identity')
};
