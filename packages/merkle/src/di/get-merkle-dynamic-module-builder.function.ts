import { Builder, Ctor } from 'fluent-interface-builder';
import { default as LRU } from 'lru-cache';

import {
   DynamicModuleParam, LocalProviderToken, ModuleIdentifier, IDynamicModuleBuilder,
   applyDynamicModuleParam,
} from '@jchptf/nestjs';

import {
   MERKLE_MODULE_ID, MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN,
   MERKLE_CALCULATOR_PROVIDER_TOKEN, MERKLE_PATH_NAMING_PROVIDER_TOKEN,
   MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN,
} from './merkle.constants';
import { MerkleDigestLocator } from '../locator';
import {
   IMerkleDynamicModuleConfigBuilder,
} from './dynamic-merkle-module-config-builder.interface';
import { IWorkingDynamicMerkleModule } from './working-dynamic-merkle-module.interface';
import { ICanonicalPathNaming, IMerkleCalculator } from '../interface';
import {
   MERKLE_CALCULATOR_PROVIDER, MERKLE_DIGEST_LRU_PROVIDER, MERKLE_IDENTITY_LRU_PROVIDER,
   MERKLE_LOCATOR_FACTORY_PROVIDER, MERKLE_PATH_NAMING_PROVIDER,
} from './merkle.providers';

export interface IDynamicMerkleModuleOptionsBuilderImpl<Consumer extends ModuleIdentifier>
extends IMerkleDynamicModuleConfigBuilder<Consumer>
{
   value: IWorkingDynamicMerkleModule<Consumer>;

   finish(): void;
}

export function getMerkleDynamicModuleBuilder<Consumer extends ModuleIdentifier>(
   moduleBuilder: IDynamicModuleBuilder<MERKLE_MODULE_ID, Consumer>,
): IDynamicMerkleModuleOptionsBuilderImpl<Consumer>
{
   const BUILDER_CTOR: Ctor<
      IWorkingDynamicMerkleModule<Consumer>,
      IDynamicMerkleModuleOptionsBuilderImpl<Consumer>
   > =
      new Builder<IWorkingDynamicMerkleModule<Consumer>,
         IDynamicMerkleModuleOptionsBuilderImpl<Consumer>>()
         .chain(
            'injectDigestLRUCache',
            (param: DynamicModuleParam<
               LRU.Cache<number, MerkleDigestLocator>,
               MERKLE_MODULE_ID, Consumer,
               typeof MERKLE_DIGEST_LRU_CACHE_PROVIDER_TOKEN
            >) =>
               (ctxt: IWorkingDynamicMerkleModule<Consumer>) => {
                  return {
                     ...ctxt,
                     digestLRU: param,
                  };
               },
         )
         .chain(
            'injectIdentityLRUCache',
            (param: DynamicModuleParam<LRU.Cache<string, string>, MERKLE_MODULE_ID, Consumer,
               typeof MERKLE_IDENTITY_LRU_CACHE_PROVIDER_TOKEN>) =>
               (ctxt: IWorkingDynamicMerkleModule<Consumer>) => {
                  return {
                     ...ctxt,
                     identityLRU: param,
                  };
               },
         )
         .chain(
            'exportCanonicalNameMap',
            (exportTo: LocalProviderToken<ICanonicalPathNaming, Consumer, ModuleIdentifier>) =>
               (ctxt: IWorkingDynamicMerkleModule<Consumer>) => {
                  return {
                     ...ctxt,
                     nameMapperExport: exportTo,
                  };
               },
         )
         .chain(
            'exportTreeCalculator',
            (exportTo: LocalProviderToken<IMerkleCalculator, Consumer, ModuleIdentifier>) =>
               (ctxt: IWorkingDynamicMerkleModule<Consumer>) => {
                  return {
                     ...ctxt,
                     calculatorExport: exportTo,
                  };
               },
         )
         .unwrap<void>(
            'finish',
            () => (ctx: IWorkingDynamicMerkleModule<Consumer>): void => {
               const moduleBuilder = ctx.moduleBuilder;
               applyDynamicModuleParam(moduleBuilder, ctx.digestLRU);
               applyDynamicModuleParam(moduleBuilder, ctx.identityLRU);

               if ((!! ctx.calculatorExport) || (!! ctx.nameMapperExport)) {
                  applyDynamicModuleParam(
                     moduleBuilder, MERKLE_LOCATOR_FACTORY_PROVIDER);

                  if (!! ctx.calculatorExport) {
                     applyDynamicModuleParam(
                        moduleBuilder, MERKLE_CALCULATOR_PROVIDER);
                     moduleBuilder.exportFromSupplier(
                        ctx.calculatorExport, MERKLE_CALCULATOR_PROVIDER_TOKEN);
                  }

                  if (!! ctx.nameMapperExport) {
                     applyDynamicModuleParam(
                        moduleBuilder, MERKLE_PATH_NAMING_PROVIDER);
                     moduleBuilder.exportFromSupplier(
                        ctx.nameMapperExport, MERKLE_PATH_NAMING_PROVIDER_TOKEN);
                  }
               }
            },
         )
         .value;

   return new BUILDER_CTOR(
      {
         moduleBuilder,
         digestLRU: MERKLE_DIGEST_LRU_PROVIDER,
         identityLRU: MERKLE_IDENTITY_LRU_PROVIDER,
      },
   );
}
