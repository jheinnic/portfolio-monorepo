import { DynamicModule, Module } from '@nestjs/common';

import {
   AsyncModuleParam, asyncProviderFromParam, DynamicProvider, DynamicProviderToken,
   getDynamicProviderToken,
   ModuleIdentifier
} from '@jchptf/nestjs';
import {
   ICanonicalPathNaming, IMerkleCalculator, IMerkleLocatorFactory, MERKLE_TREE_CALCULATOR_LPT,
   MerkleTreeDescription
} from '..';
import {
   MERKLE_LOCATOR_FACTORY_LPT, MERKLE_LOCATOR_FACTORY_TYPE,
   MERKLE_DYNAMIC_MODULE_TYPE, MERKLE_PATH_NAMING_LPT, MERKLE_PATH_NAMING_TYPE,
   MERKLE_TREE_CALCULATOR_TYPE
} from './merkle.constants';
import {
   MERKLE_CALCULATOR_LOCAL_PROVIDER, MERKLE_DIGEST_LRU_LOCAL_PROVIDER,
   MERKLE_IDENTITY_LRU_LOCAL_PROVIDER,
   MERKLE_LOCATOR_FACTORY_LOCAL_PROVIDER,
   MERKLE_PATH_NAMING_LOCAL_PROVIDER
} from './merkle.providers';

@Module({})
export class MerkleModule
{
   public static forFeature(
      forModule: ModuleIdentifier,
      treeDescription: MerkleTreeDescription,
      withTag?: string): DynamicModule
   {
      const localProviders = MERKLE_LOCAL_PROVIDERS;
      const dynamicProviders =
         MerkleModule.getDynamicProviders(forModule, withTag);

      return {
         module: MerkleModule,
         providers: [
            {
               provide: MerkleTreeDescription,
               useValue: treeDescription
            },
            ...localProviders,
            ...dynamicProviders
         ],
         exports: [
            ...dynamicProviders
         ],
      };
   }

   public static async forFeatureAsync(
      forModule: ModuleIdentifier,
      asyncTreeDescription: AsyncModuleParam<MerkleTreeDescription>,
      withTag?: string): Promise<DynamicModule>
   {
      const treeDescription =
         asyncProviderFromParam(MerkleTreeDescription, asyncTreeDescription);

      const localProviders = MERKLE_LOCAL_PROVIDERS;
      const dynamicProviders =
         MerkleModule.getDynamicProviders(forModule, withTag);

      return {
         module: MerkleModule,
         providers: [
            {
               provide: MerkleTreeDescription,
               useValue: treeDescription
            },
            ...localProviders,
            ...dynamicProviders
         ],
         exports: [
            ...dynamicProviders
         ],
      };
   }

   private static getDynamicProviders(
      forModule: ModuleIdentifier, withTag?: string
   ): [DynamicProvider<IMerkleCalculator>,
       DynamicProvider<IMerkleLocatorFactory>,
       DynamicProvider<ICanonicalPathNaming>]
   {
      const calculatorToken: DynamicProviderToken<IMerkleCalculator> =
         getDynamicProviderToken(
            forModule, MERKLE_DYNAMIC_MODULE_TYPE,
            MERKLE_TREE_CALCULATOR_TYPE, withTag);
      const locatorFactoryToken: DynamicProviderToken<IMerkleLocatorFactory> =
         getDynamicProviderToken(
            forModule, MERKLE_DYNAMIC_MODULE_TYPE,
            MERKLE_LOCATOR_FACTORY_TYPE, withTag);
      const pathNamingToken: DynamicProviderToken<ICanonicalPathNaming> =
         getDynamicProviderToken(
            forModule, MERKLE_DYNAMIC_MODULE_TYPE,
            MERKLE_PATH_NAMING_TYPE, withTag);

      return [
         {
            provide: calculatorToken,
            useFactory: (calculator: IMerkleCalculator) => calculator,
            inject: [MERKLE_TREE_CALCULATOR_LPT],
         }, {
            provide: locatorFactoryToken,
            useFactory: (locatorFactory: IMerkleLocatorFactory) => locatorFactory,
            inject: [MERKLE_LOCATOR_FACTORY_LPT],
         }, {
            provide: pathNamingToken,
            useFactory: (pathNaming: ICanonicalPathNaming) => pathNaming,
            inject: [MERKLE_PATH_NAMING_LPT],
         }
      ];
   }
}

const MERKLE_LOCAL_PROVIDERS = [
   MERKLE_CALCULATOR_LOCAL_PROVIDER,
   MERKLE_LOCATOR_FACTORY_LOCAL_PROVIDER,
   MERKLE_PATH_NAMING_LOCAL_PROVIDER,
   MERKLE_DIGEST_LRU_LOCAL_PROVIDER,
   MERKLE_IDENTITY_LRU_LOCAL_PROVIDER
];

