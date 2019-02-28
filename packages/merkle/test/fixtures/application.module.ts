import { Module } from '@nestjs/common';

import { testModule, treeDescriptionOne, treeDescriptionTwo } from './fixture.constants';
import { fauxContainerToken } from './fixture.constants';
import { FauxContainer } from './faux-container.class';
import { MerkleModule } from '@jchptf/merkle';

// @ts-ignore
@Module(
   {
      imports: [
         MerkleModule.forFeature(testModule, treeDescriptionOne, 'first'),
         MerkleModule.forFeature(testModule, treeDescriptionTwo, 'second'),
      ],
      providers: [
         { provide: fauxContainerToken, useClass: FauxContainer }
      ],
      exports: [MerkleModule]
         // dynamicCalcOneToken, dynamicCalcTwoToken
      // ]
   }
)
export class ApplicationModule {

}