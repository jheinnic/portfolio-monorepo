import { BitInputStream } from '@thi.ng/bitstream';
import { BitStrategyKind, ModelSeedPolicy } from '../../../attic/modules/tickets2/config';
import { AbstractModelSeedStrategy } from './abstract-model-seed.strategy.class';

export class RawModelSeedStrategy extends AbstractModelSeedStrategy
{
   constructor(policyData: ModelSeedPolicy)
   {
      super(policyData);
   }

   public get strategyKind(): BitStrategyKind
   {
      return BitStrategyKind.raw;
   }

   protected applyTransform(selectedBits: BitInputStream, bitsToUse: number): Uint8Array
   {
      const xWords = Math.floor((
         bitsToUse
      ) / 8);
      return new Uint8Array(selectedBits.readWords(xWords, 8));
   }
}
