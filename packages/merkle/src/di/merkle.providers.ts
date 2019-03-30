import { default as LRU } from 'lru-cache';

import { DynamicProviderBindingStyle, IBoundDynamicModuleImport } from '@jchptf/nestjs';

import { ICanonicalPathNaming, IMerkleCalculator, IMerkleLocatorFactory } from '../interface';
import { MerkleDigestLocator, MerkleLocatorFactory } from '../locator';
import { CanonicalPathNaming } from '../canonical-path-naming.class';
import { MerkleCalculator } from '../merkle-calculator.class';

import {
   MERKLE_CALCULATOR_PROVIDER_TOKEN, MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN,
   MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN, MERKLE_LOCATOR_FACTORY_PROVIDER_TOKEN,
   MERKLE_PATH_NAMING_PROVIDER_TOKEN, MerkleModuleId,
} from './merkle.constants';

export const MERKLE_CALCULATOR_PROVIDER:
   IBoundDynamicModuleImport<IMerkleCalculator, typeof MerkleModuleId, any> = {
      style: DynamicProviderBindingStyle.CLASS,
      provide: MERKLE_CALCULATOR_PROVIDER_TOKEN,
      useClass: MerkleCalculator,
   };

export const MERKLE_LOCATOR_FACTORY_PROVIDER:
   IBoundDynamicModuleImport<IMerkleLocatorFactory, typeof MerkleModuleId, any> = {
      style: DynamicProviderBindingStyle.CLASS,
      provide: MERKLE_LOCATOR_FACTORY_PROVIDER_TOKEN,
      useClass: MerkleLocatorFactory,
   };

export const MERKLE_PATH_NAMING_PROVIDER:
   IBoundDynamicModuleImport<ICanonicalPathNaming, typeof MerkleModuleId, any> = {
      style: DynamicProviderBindingStyle.CLASS,
      provide: MERKLE_PATH_NAMING_PROVIDER_TOKEN,
      useClass: CanonicalPathNaming,
   };

export const MERKLE_DIGEST_LRU_PROVIDER: IBoundDynamicModuleImport<
   LRU.Cache<number, MerkleDigestLocator>, typeof MerkleModuleId, any
> = {
   style: DynamicProviderBindingStyle.FACTORY_METHOD_CALL,
   provide: MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN,
   useFactory: () => LRU<number, MerkleDigestLocator>(Math.pow(2, 12)),
};

export const MERKLE_IDENTITY_LRU_PROVIDER: IBoundDynamicModuleImport<
   LRU.Cache<string, string>, typeof MerkleModuleId, any
> = {
   style: DynamicProviderBindingStyle.FACTORY_METHOD_CALL,
   provide: MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN,
   useFactory: () => LRU<string, string>(Math.pow(2, 8)),
};
