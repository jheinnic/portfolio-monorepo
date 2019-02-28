import { Injectable, Inject } from '@nestjs/common';
import { dynamicCalcOneToken, dynamicCalcTwoToken, dynamicNamingOneToken } from './fixture.constants';
import { ICanonicalPathNaming, IMerkleCalculator } from '@jchptf/merkle';

@Injectable()
export class FauxContainer {
   constructor(
      @Inject(dynamicCalcOneToken) public readonly calcOne: IMerkleCalculator,
      @Inject(dynamicCalcTwoToken) public readonly calcTwo: IMerkleCalculator,
      @Inject(dynamicNamingOneToken) public readonly namesOne: ICanonicalPathNaming
   ) {
   }

   public doSomething() {
      console.log(this.calcOne.tierCount, this.calcOne.treeDepth);
      console.log(this.calcTwo.tierCount, this.calcTwo.treeDepth);

      console.log('path order');
      let series = this.namesOne.findAllBlocksPathNamesDepthFirst("keypairs", true);
      for( let nextPath of [...series] ) {
         console.log(nextPath.name);
      }
      console.log('path done');

      console.log('digest order');
      for( let nextPath of this.namesOne.findLeafDigestPathNames("images", true, ".png")) {
         console.log(nextPath.name);
      }
      console.log('digest done');
   }
}