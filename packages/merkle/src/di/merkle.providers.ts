import { MerkleCalculator } from '../merkle-calculator.class';
import { MerkleDigestLocator, MerkleLocatorFactory } from '../locator';
import { CanonicalPathNaming } from '../canonical-path-naming.class';
import { default as LRU } from 'lru-cache';
import {
   MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN, MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN,
   MERKLE_LOCATOR_FACTORY_PROVIDER_TOKEN, MERKLE_MODULE_ID, MERKLE_PATH_NAMING_PROVIDER_TOKEN,
   MERKLE_CALCULATOR_PROVIDER_TOKEN,
} from './merkle.constants';
import { DynamicModuleParam, DynamicModuleParamStyle } from '@jchptf/nestjs';
import { ICanonicalPathNaming, IMerkleCalculator, IMerkleLocatorFactory } from '../interface';

export const MERKLE_CALCULATOR_PROVIDER:
   DynamicModuleParam<IMerkleCalculator, MERKLE_MODULE_ID, any,
      typeof MERKLE_CALCULATOR_PROVIDER_TOKEN> =
   {
      style: DynamicModuleParamStyle.CLASS,
      provide: MERKLE_CALCULATOR_PROVIDER_TOKEN,
      useClass: MerkleCalculator,
   };

export const MERKLE_LOCATOR_FACTORY_PROVIDER:
   DynamicModuleParam<IMerkleLocatorFactory, MERKLE_MODULE_ID, any,
      typeof MERKLE_LOCATOR_FACTORY_PROVIDER_TOKEN> =
   {
      style: DynamicModuleParamStyle.CLASS,
      provide: MERKLE_LOCATOR_FACTORY_PROVIDER_TOKEN,
      useClass: MerkleLocatorFactory,
   };

export const MERKLE_PATH_NAMING_PROVIDER:
   DynamicModuleParam<ICanonicalPathNaming, MERKLE_MODULE_ID, any,
      typeof MERKLE_PATH_NAMING_PROVIDER_TOKEN> =
   {
      style: DynamicModuleParamStyle.CLASS,
      provide: MERKLE_PATH_NAMING_PROVIDER_TOKEN,
      useClass: CanonicalPathNaming,
   };

export const MERKLE_DIGEST_LRU_PROVIDER:
   DynamicModuleParam<LRU.Cache<number, MerkleDigestLocator>, MERKLE_MODULE_ID, any,
      typeof MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN> =
   {
      style: DynamicModuleParamStyle.FACTORY_METHOD_CALL,
      provide: MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN,
      useFactory: () => LRU<number, MerkleDigestLocator>(Math.pow(2, 12)),
   };

export const MERKLE_IDENTITY_LRU_PROVIDER:
   DynamicModuleParam<LRU.Cache<string, string>, MERKLE_MODULE_ID,
      any, typeof MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN> =
   {
      style: DynamicModuleParamStyle.FACTORY_METHOD_CALL,
      provide: MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN,
      useFactory: () => LRU<string, string>(Math.pow(2, 8)),
   };
