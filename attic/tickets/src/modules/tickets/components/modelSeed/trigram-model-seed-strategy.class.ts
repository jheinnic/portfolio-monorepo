import { BitInputStream } from '@thi.ng/bitstream';
import * as fs from 'fs';
import * as path from 'path';
import binarySearch from 'binary-search';
import { eachLine } from 'line-reader';


import { BitStrategyKind, ModelSeedPolicy } from '../../config';
import { AbstractAsyncModelSeedStrategy } from './abstract-async-model-seed.strategy.class';

function naturalOrder(element: number, needle: number) { return element - needle; }

interface TrigramData {
   readonly trigrams: string[]; // { [K in string]: { weight: number } } ;
   readonly freqSum: number[];
   readonly prefixSum: number;
}

export class TrigramModelSeedStrategy extends AbstractAsyncModelSeedStrategy {
   private readonly trigrams: Promise<TrigramData>;

   constructor(policyData: ModelSeedPolicy) {
      super(policyData);

      // const trigrams:{ [K in string]: { weight: number } } = {};
      const trigrams: string[] = [];
      const freqSum: number[] = [];
      let prefixSum: number = 0;

      this.trigrams = new Promise<TrigramData>((resolve, reject) => {
         let input = fs.createReadStream(
            path.join(__dirname, '../../../../../english_trigrams.txt')
         );
         eachLine(input, (txt: string, last: boolean, cb: Function|undefined) => {
            try {
               console.log('line', txt);
               const tokens = txt.split(/ /);
               trigrams.push(tokens[0].toLowerCase());
               prefixSum += parseInt(tokens[1]);
               freqSum.push(prefixSum);

               if (last) {
                  resolve({trigrams, freqSum, prefixSum});
               }
            } catch (e) {
               reject(e);
               cb!(false);
            }
            cb!(true);
         });
      }).catch(function (err) {
         if (err) console.error(err);
         throw err;
      })
   }

   public get strategyKind(): BitStrategyKind
   {
      return BitStrategyKind.trigrams;
   }

   private static MAX_UINT32: number = 4294967295;

   protected async applyTransform(selectedBytes: BitInputStream, bitsToUse: number): Promise<Uint8Array>
   {
      const trigramData = await this.trigrams;
      const words = Math.floor(bitsToUse / 32);
      const sourceBits = new Uint32Array(selectedBytes.readWords(words, 32));
      const output = new Uint8Array(3*words);

      for (let ii=0, jj=0; ii < words; ii++, jj+=3 ) {
         // Since sourceBits[ii] is an unsigned int, this should always yield a positive value within [0, prefixSum)
         const nextP = Math.floor((sourceBits[ii] / TrigramModelSeedStrategy.MAX_UINT32) * trigramData.prefixSum);
         let pIdx: number = binarySearch(trigramData.freqSum, nextP, naturalOrder);
         if (pIdx < 0) {
            pIdx = -1 * (pIdx + 1);
         }
         const nextGram = trigramData.trigrams[pIdx];
         output[jj] = nextGram.charCodeAt(0);
         output[jj+1] = nextGram.charCodeAt(1);
         output[jj+2] = nextGram.charCodeAt(2);

         // Capitalize first letter.
         if (jj === 0) {
            output[jj] = output[jj] - 32;
         }
      }

      return output;
   }
}
