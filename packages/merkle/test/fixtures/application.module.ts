import { Module } from '@nestjs/common';

import { MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN, MerkleModule } from '@jchptf/merkle';
import { DynamicModuleParamStyle } from '@jchptf/nestjs';

import {
   dynamicCalculatorOneToken, dynamicCalculatorTwoToken, dynamicPathNamingOneToken,
   fauxContainerToken, TEST_MODULE_ID, treeDescriptionOne, treeDescriptionTwo,
} from './fixture.constants';
import { FauxContainer } from './faux-container.class';
import {
   IMerkleDynamicModuleConfigBuilder
} from '../../src/di/dynamic-merkle-module-config-builder.interface';

export const APPLICATION_MODULE_ID = Symbol('ApplicationModuleId');
export type APPLICATION_MODULE_ID = typeof APPLICATION_MODULE_ID;

// @ts-ignore
@Module(
   {
      imports: [
         MerkleModule.forFeature<TEST_MODULE_ID>(
            ApplicationModule,
            {
               style: DynamicModuleParamStyle.VALUE,
               provide: MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN,
               useValue: treeDescriptionOne,
            },
            (builder: IMerkleDynamicModuleConfigBuilder<TEST_MODULE_ID>) => {
               builder.exportTreeCalculator(dynamicCalculatorOneToken)
                  .exportCanonicalNameMap(dynamicPathNamingOneToken);
            },
         ),
         MerkleModule.forFeature<TEST_MODULE_ID>(
            ApplicationModule,
            {
               style: DynamicModuleParamStyle.VALUE,
               provide: MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN,
               useValue: treeDescriptionTwo,
            },
            (builder: IMerkleDynamicModuleConfigBuilder<TEST_MODULE_ID>) => {
               builder.exportTreeCalculator(dynamicCalculatorTwoToken);
            },
         ),
      ],
      providers: [
         {
            provide: fauxContainerToken,
            useClass: FauxContainer,
         },
      ],
      exports: [MerkleModule],
   },
)
export class ApplicationModule
{

}
