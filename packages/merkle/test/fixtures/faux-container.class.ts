import { Inject, Injectable } from '@nestjs/common';
import {
   dynamicCalculatorOneToken, dynamicCalculatorTwoToken, dynamicPathNamingOneToken,
} from './fixture.constants';
import { ICanonicalPathNaming, IMerkleCalculator } from '@jchptf/merkle';

@Injectable()
export class FauxContainer
{
   constructor(
      @Inject(dynamicCalculatorOneToken) public readonly calcOne: IMerkleCalculator,
      @Inject(dynamicCalculatorTwoToken) public readonly calcTwo: IMerkleCalculator,
      @Inject(dynamicPathNamingOneToken) public readonly namesOne: ICanonicalPathNaming,
   )
   {
   }

   public doSomething()
   {
      console.log(this.calcOne.tierCount, this.calcOne.treeDepth);
      console.log(this.calcTwo.tierCount, this.calcTwo.treeDepth);

      console.log('path order');
      const series = this.namesOne.findAllBlocksPathNamesDepthFirst('keypairs', true);
      for (const nextPath of [...series]) {
         console.log(nextPath.name);
      }
      console.log('path done');

      console.log('digest order');
      for (const nextPath of this.namesOne.findLeafDigestPathNames('images', true, '.png')) {
         console.log(nextPath.name);
      }
      console.log('digest done');
   }
}
