import { BitInputStream } from '@thi.ng/bitstream';

import { ModelSeed } from '../../modules/randomArt/messages';
import { IPaintModelSeedStrategy } from '../../../attic/modules/tickets2/interface';
import { BitStrategyKind, ModelSeedPolicy, PrefixSelectStyle } from '../../../attic/modules/tickets2/config';
import { Name } from '../../../../../../src/infrastructure/validation';

export abstract class AbstractModelSeedStrategy implements IPaintModelSeedStrategy {
   constructor(protected readonly policyData: ModelSeedPolicy) { }

   public get name(): Name {
      return this.policyData.name;
   }

   public abstract get strategyKind(): BitStrategyKind;

   public extractSeed(publicKeyX: Buffer, publicKeyY: Buffer): ModelSeed
   {
      const xBuffer: Buffer = Buffer.from(publicKeyX);
      const yBuffer: Buffer = Buffer.from(publicKeyY);

      let xFrom = this.policyData.xFromBit;
      let xTo = this.policyData.xToBit;
      let yFrom = this.policyData.yFromBit;
      let yTo = this.policyData.yToBit;

      if (!this.policyData.xRunsForward) {
         xBuffer.reverse();
         xFrom = 256 - xFrom;
         xTo = 256 - xTo;

         xFrom += xTo;
         xTo = xFrom - xTo;
         xFrom = xFrom - xTo;
      }
      if (!this.policyData.yRunsForward) {
         yBuffer.reverse();
         yFrom = 256 - yFrom;
         yTo = 256 - yTo;
         yFrom += yTo;
         yTo = yFrom - yTo;
         yFrom = yFrom - yTo;
      }

      const xBits = new BitInputStream(xBuffer);
      const yBits = new BitInputStream(yBuffer);
      xBits.seek(xFrom);
      yBits.seek(yFrom);

      const prefix: Uint8Array =
         (this.policyData.prefixSelect === PrefixSelectStyle.USE_X)
            ? this.applyTransform(xBits, xTo - xFrom)
            : this.applyTransform(yBits, yTo - yFrom);

      const suffix: Uint8Array =
         (this.policyData.prefixSelect === PrefixSelectStyle.USE_X)
            ? this.applyTransform(yBits, yTo - yFrom)
            : this.applyTransform(xBits, xTo - xFrom);

      return {
         prefixBits: prefix,
         suffixBits: suffix,
         novel: this.policyData.useNewModel,
      };
   }

   protected abstract applyTransform(selectedBytes: BitInputStream, bitsToUse: number): Uint8Array;
}
