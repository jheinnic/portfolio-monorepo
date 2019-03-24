import { Module, Type, DynamicModule } from '@nestjs/common';

import { IDirector } from '@jchptf/api';
import {
   applyDynamicModuleParam, buildDynamicModule, DynamicModuleParam, IDynamicModuleBuilder,
   ModuleIdentifier,
} from '@jchptf/nestjs';
import { MerkleTreeDescription } from '..';
import { MERKLE_MODULE_ID, MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN } from './merkle.constants';
import {
   IMerkleDynamicModuleConfigBuilder,
} from './dynamic-merkle-module-config-builder.interface';
import {
   getMerkleDynamicModuleBuilder, IDynamicMerkleModuleOptionsBuilderImpl,
} from './get-merkle-dynamic-module-builder.function';

@Module({})
export class MerkleModule
{
   public static forFeature<Consumer extends ModuleIdentifier>(
      forModule: Type<any>,
      treeDescription: DynamicModuleParam<MerkleTreeDescription, MERKLE_MODULE_ID,
         Consumer, typeof MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN>,
      optionsDirector: IDirector<IMerkleDynamicModuleConfigBuilder<Consumer>>,
   ): DynamicModule
   {
      // Adapt the raw module types with a factory facade, then wrap that facade
      // with a builder adapter tailored to the Merkle module specifically and
      // pass that abstraction to the IDirector received from the caller.  Carry
      // on with the requested work.
      return buildDynamicModule(
         MerkleModule, forModule,
         (builder: IDynamicModuleBuilder<MERKLE_MODULE_ID, Consumer>): void => {
            // We have one sure-fire injection--the tree description--since it is a
            // mandatory argument, it is not covered by the builder.
            applyDynamicModuleParam(builder, treeDescription);

            const merkleBuilder: IDynamicMerkleModuleOptionsBuilderImpl<Consumer> =
               getMerkleDynamicModuleBuilder(builder);

            optionsDirector(merkleBuilder);
            merkleBuilder.finish();
         },
      );
   }
}
