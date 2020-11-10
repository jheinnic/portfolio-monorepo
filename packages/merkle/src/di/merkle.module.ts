import { Type, DynamicModule, Module } from '@nestjs/common';
import * as LRU from 'lru-cache';

import {
   buildDynamicModule, DynamicModuleConfig, IDynamicModuleBuilder, IModule, MODULE_ID,
} from '@jchptf/nestjs';

import {
   MERKLE_DIGEST_LRU_CACHE, MERKLE_IDENTITY_LRU_CACHE, MERKLE_LOCATOR_FACTORY, MERKLE_MODULE_ID,
   MERKLE_PATH_NAMING, MERKLE_TREE_CALCULATOR, MERKLE_TREE_DESCRIPTION, MerkleModuleId,
} from './merkle.constants';
import {
   MERKLE_CALCULATOR_PROVIDER, MERKLE_DIGEST_LRU_PROVIDER, MERKLE_IDENTITY_LRU_PROVIDER,
   MERKLE_LOCATOR_FACTORY_PROVIDER, MERKLE_PATH_NAMING_PROVIDER,
} from './merkle.providers';
import { MerkleTreeDescription } from '../merkle-tree-description.value';
import { ICanonicalPathNaming, IMerkleCalculator, IMerkleLocatorFactory } from '../interface';
import { MerkleDigestLocator } from '../locator';
import { MerkleModuleOptions } from './merkle-module-options.interface';

@Module({})
export class MerkleModule extends MerkleModuleId
{
   public readonly [MODULE_ID] = MERKLE_MODULE_ID;

   [MERKLE_TREE_DESCRIPTION]: MerkleTreeDescription;
   [MERKLE_TREE_CALCULATOR]: IMerkleCalculator;
   [MERKLE_LOCATOR_FACTORY]: IMerkleLocatorFactory;
   [MERKLE_PATH_NAMING]: ICanonicalPathNaming;
   [MERKLE_DIGEST_LRU_CACHE]: LRU.Cache<number, MerkleDigestLocator>;
   [MERKLE_IDENTITY_LRU_CACHE]: LRU.Cache<string, string>;

   /*
   public static forFeature<Consumer extends IModule>(
      forModule: Consumer,
      treeDescription: IBoundDynamicModuleImport<MerkleTreeDescription, typeof MerkleModule,
         Consumer>,
      optionsDirector: IDirector<IMerkleDynamicModuleConfigBuilder<Consumer>>,
   ): DynamicModule
   {
      // Adapt the raw module types with a factory facade, then wrap that facade
      // with a builder adapter tailored to the Merkle module specifically and
      // pass that abstraction to the IDirector received from the caller.  Carry
      // on with the requested work.
      return buildDynamicModule(
         MerkleModule,
         forModule,
         (builder: IDynamicModuleBuilder<typeof MerkleModule, Consumer>): void => {
            // We have one sure-fire injection--the tree description--since it is a
            // mandatory argument, it is not covered by the builder.
            builder.acceptBoundImport(treeDescription);

            const merkleBuilder: IDynamicMerkleModuleOptionsBuilderImpl<Consumer> =
               getMerkleDynamicModuleBuilder(builder);

            optionsDirector(merkleBuilder);
            merkleBuilder.finish();
         },
      );
   }
   */

   public static forFeature<Consumer extends IModule>(
      options: MerkleModuleOptions<Consumer>,
      consumerType: Type<Consumer>,
   ): DynamicModule
   {
      // Adapt the raw module types with a factory facade, then wrap that facade
      // with a builder adapter tailored to the Merkle module specifically and
      // pass that abstraction to the IDirector received from the caller.  Carry
      // on with the requested work.
      return buildDynamicModule(
         MerkleModule,
         consumerType,
         (builder: IDynamicModuleBuilder<MerkleModule, Consumer>): void => {
            const digestLruCache = !options[MERKLE_DIGEST_LRU_CACHE]
               ? MERKLE_DIGEST_LRU_PROVIDER
               : options[MERKLE_DIGEST_LRU_CACHE]!;

            const identityLruCache = !options[MERKLE_IDENTITY_LRU_CACHE]
               ? MERKLE_IDENTITY_LRU_PROVIDER
               : options[MERKLE_IDENTITY_LRU_CACHE]!;

            builder
               .acceptBoundImport(options[MERKLE_TREE_DESCRIPTION])
               .acceptBoundImport(digestLruCache)
               .acceptBoundImport(identityLruCache);

            const calculatorExport = options[MERKLE_TREE_CALCULATOR];
            const nameMapperExport = options[MERKLE_PATH_NAMING];
            if ((
               !!calculatorExport
            ) || (
               !!nameMapperExport
            ))
            {
               builder.acceptBoundImport(MERKLE_LOCATOR_FACTORY_PROVIDER);

               if (!!calculatorExport) {
                  builder
                     .acceptBoundImport(MERKLE_CALCULATOR_PROVIDER)
                     .exportFromSupplier(calculatorExport, MERKLE_TREE_CALCULATOR);
               }

               if (!!nameMapperExport) {
                  builder
                     .acceptBoundImport(MERKLE_PATH_NAMING_PROVIDER)
                     .exportFromSupplier(nameMapperExport, MERKLE_PATH_NAMING);
               }
            }
         },
      );
   }
}

export type MerkleModuleOptions<Consumer extends IModule> = DynamicModuleConfig<
  MerkleModule,
  Consumer,
  typeof MERKLE_TREE_DESCRIPTION,
  typeof MERKLE_DIGEST_LRU_CACHE | typeof MERKLE_IDENTITY_LRU_CACHE,
  typeof MERKLE_PATH_NAMING | typeof MERKLE_TREE_CALCULATOR
  >;
