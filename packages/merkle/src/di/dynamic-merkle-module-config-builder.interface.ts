import { default as LRU } from 'lru-cache';

import { DynamicModuleParam, LocalProviderToken, ModuleIdentifier } from '@jchptf/nestjs';

import { MerkleDigestLocator } from '../locator';
import {
   MERKLE_MODULE_ID, MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN,
   MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN,
} from './merkle.constants';
import { ICanonicalPathNaming, IMerkleCalculator } from '../interface';

export interface IMerkleDynamicModuleConfigBuilder<Consumer extends ModuleIdentifier>
{
   injectDigestLRUCache(param: DynamicModuleParam<
      LRU.Cache<number, MerkleDigestLocator>, MERKLE_MODULE_ID,
      Consumer, typeof MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN>,
   ): IMerkleDynamicModuleConfigBuilder<Consumer>;

   injectIdentityLRUCache(param: DynamicModuleParam<
      LRU.Cache<string, string>, MERKLE_MODULE_ID,
      Consumer, typeof MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN>,
   ): IMerkleDynamicModuleConfigBuilder<Consumer>;

   exportCanonicalNameMap(
      exportTo: LocalProviderToken<ICanonicalPathNaming, Consumer, string|symbol>,
   ): IMerkleDynamicModuleConfigBuilder<Consumer>;

   exportTreeCalculator(
      exportTo: LocalProviderToken<IMerkleCalculator, Consumer, string|symbol>,
   ): IMerkleDynamicModuleConfigBuilder<Consumer>;
}