import * as fs from 'fs';
const bs = require('binary-search');
// @ts-ignore
import { LineReader } from 'co-stream';
import { co } from 'co';  // ../../semaphore/typings/co';

import { IsaacCSPRNG } from '@jchptf/isaac';

const trigrams: string[] = [];
const freqSum: number[] = [];
let prefixSum: number = 0;

function naturalOrder(element: number, needle: number) { return element - needle; }

co(function* () {
   const input = fs.createReadStream('../../english_trigrams.txt');
   const reader = new LineReader(input);
   const start = Date.now();
   let txt: string | undefined;

   while (!!(txt = yield reader.read()))
   {
      // console.log('line', txt);
      const tokens = (txt as string).split(/ /);
      trigrams.push(tokens[0]);
      prefixSum += parseInt(tokens[1], 10);
      freqSum.push(prefixSum);
   }

   console.log('done. %d lines, %d ms.', prefixSum, Date.now() - start);
})
  .catch(async (err: any) => {
     if (err) {
        console.log(err);
     }
  })
  // const strm = fs.createReadStream('../../english_trigrams.txt')
  //    .pipe(cs.split())
  //    .pipe(cs.each(function* (line: string): IterableIterator<any> {
  //       console.log('line');
  //       const tokens = line.split(/ /);
  //       trigrams.push(tokens[0]);
  //       prefixSum += parseInt(tokens[1]);
  //       freqSum.push(prefixSum);
  //    }, {}));

  .then(() => {
     console.log('Fin!');

     const foo: IsaacCSPRNG = new IsaacCSPRNG([93, 84, 891, 9227, 292, 19, 9283, 173, 842]);
     for (let ii = 0; ii < 1000; ii = ii + 1) {
        let prefix = '';
        let suffix = '';
        for (let ii = 0; ii < 5; ii = ii + 1) {
           const nextP = foo.int32() % prefixSum;
           let pIdx = bs(freqSum, nextP, naturalOrder);
           if (pIdx < 0) {
              pIdx = -1 * (
                pIdx + 1
              );
           }

           const nextS = foo.int32() % prefixSum;
           let sIdx = bs(freqSum, nextS, naturalOrder);
           if (sIdx < 0) {
              sIdx = -1 * (
                sIdx + 1
              );
           }

           prefix = prefix + trigrams[pIdx];
           suffix = suffix + trigrams[sIdx];
        }
        prefix = prefix.toLocaleLowerCase();
        suffix = suffix.toLocaleLowerCase();
        console.log(`${prefix} ${suffix}`);
     }

     console.log(prefixSum);

     const length = trigrams.length;
     for (let ii = 0; ii < length; ii = ii + 1) {
        fs.writeFileSync('trigram_prefix_sums.dat', `${trigrams[ii]} ${freqSum[ii]}\n`);
     }
  });
