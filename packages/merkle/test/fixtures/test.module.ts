import { Module } from '@nestjs/common';
import { DynamicProviderBindingStyle } from '@jchptf/nestjs';
import {
   MERKLE_PATH_NAMING, MERKLE_TREE_CALCULATOR, MERKLE_TREE_DESCRIPTION,
   MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN, MerkleModule,
} from '@jchptf/merkle';

import {
   dynamicCalculatorOneToken, dynamicCalculatorTwoToken, dynamicPathNamingOneToken,
   fauxContainerToken, treeDescriptionOne, treeDescriptionTwo, TestModuleId,
} from './fixture.constants';
import { FauxContainer } from './faux-container.class';

@Module({
   imports: [
      MerkleModule.forFeature<typeof TestModuleId>({
         forModule: TestModuleId,
         [MERKLE_TREE_DESCRIPTION]: {
            style: DynamicProviderBindingStyle.VALUE,
            provide: MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN,
            useValue: treeDescriptionOne,
         },
         [MERKLE_TREE_CALCULATOR]: dynamicCalculatorOneToken,
         [MERKLE_PATH_NAMING]: dynamicPathNamingOneToken,
      }),
      MerkleModule.forFeature<typeof TestModuleId>({
         forModule: TestModuleId,
         [MERKLE_TREE_DESCRIPTION]: {
            style: DynamicProviderBindingStyle.VALUE,
            provide: MERKLE_TREE_DESCRIPTION_PROVIDER_TOKEN,
            useValue: treeDescriptionTwo,
         },
         [MERKLE_TREE_CALCULATOR]: dynamicCalculatorTwoToken,
      }),
   ],
   providers: [
      {
         provide: fauxContainerToken,
         useClass: FauxContainer,
      },
   ],
   exports: [MerkleModule],
})
export class TestModule {
}
