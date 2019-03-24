import {
   DynamicModuleParam, IDynamicModuleBuilder, LocalProviderToken, ModuleIdentifier
} from '@jchptf/nestjs';
import { default as LRU } from 'lru-cache';
import { MerkleDigestLocator } from '../locator';
import {
   MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN, MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN,
   MERKLE_MODULE_ID,
} from './merkle.constants';
import { ICanonicalPathNaming, IMerkleCalculator } from '../interface';

export interface IWorkingDynamicMerkleModule<Consumer extends ModuleIdentifier>
{
   moduleBuilder: IDynamicModuleBuilder<MERKLE_MODULE_ID, Consumer>;

   digestLRU: DynamicModuleParam<
      LRU.Cache<number, MerkleDigestLocator>, MERKLE_MODULE_ID,
      Consumer, typeof MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN>;

   identityLRU: DynamicModuleParam<
      LRU.Cache<string, string>, MERKLE_MODULE_ID,
      Consumer, typeof MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN>;

   nameMapperExport?: LocalProviderToken<ICanonicalPathNaming, Consumer, string|symbol>;

   calculatorExport?: LocalProviderToken<IMerkleCalculator, Consumer, string|symbol>;
}
