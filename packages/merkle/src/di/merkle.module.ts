import { DynamicModule, Module } from '@nestjs/common';

import { buildDynamicModule, IDynamicModuleBuilder, IModule } from '@jchptf/nestjs';

import {
   MERKLE_DIGEST_LRU_CACHE, MERKLE_IDENTITY_LRU_CACHE, MERKLE_PATH_NAMING, MERKLE_TREE_CALCULATOR,
   MERKLE_TREE_DESCRIPTION, MERKLE_CALCULATOR_PROVIDER_TOKEN, MERKLE_PATH_NAMING_PROVIDER_TOKEN,
   MerkleModuleId,
} from './merkle.constants';
import {
   MERKLE_CALCULATOR_PROVIDER, MERKLE_DIGEST_LRU_PROVIDER, MERKLE_IDENTITY_LRU_PROVIDER,
   MERKLE_LOCATOR_FACTORY_PROVIDER, MERKLE_PATH_NAMING_PROVIDER,
} from './merkle.providers';
import { MerkleModuleOptions } from './merkle-module-options.interface';

@Module({})
export class MerkleModule extends MerkleModuleId
{
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
   ): DynamicModule
   {
      // Adapt the raw module types with a factory facade, then wrap that facade
      // with a builder adapter tailored to the Merkle module specifically and
      // pass that abstraction to the IDirector received from the caller.  Carry
      // on with the requested work.
      return buildDynamicModule(
         MerkleModule,
         options.forModule,
         (builder: IDynamicModuleBuilder<typeof MerkleModuleId, Consumer>): void => {
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
                     .exportFromSupplier(calculatorExport, MERKLE_CALCULATOR_PROVIDER_TOKEN);
               }

               if (!!nameMapperExport) {
                  builder
                     .acceptBoundImport(MERKLE_PATH_NAMING_PROVIDER)
                     .exportFromSupplier(nameMapperExport, MERKLE_PATH_NAMING_PROVIDER_TOKEN);
               }
            }
         },
      );
   }
}
