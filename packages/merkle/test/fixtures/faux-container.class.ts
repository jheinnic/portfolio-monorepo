import { Injectable, Inject } from '@nestjs/common';
import { dynamicCalcOneToken, dynamicCalcTwoToken } from './fixture.constants';
import { IMerkleCalculator } from '@jchptf/merkle';

@Injectable()
export class FauxContainer {
   constructor(
      @Inject(dynamicCalcOneToken) public readonly calcOne: IMerkleCalculator,
      @Inject(dynamicCalcTwoToken) public readonly calcTwo: IMerkleCalculator
   ) {
   }

   public doSomething() {
      console.log(this.calcOne.tierCount, this.calcOne.treeDepth);
      console.log(this.calcTwo.tierCount, this.calcTwo.treeDepth);
   }
}