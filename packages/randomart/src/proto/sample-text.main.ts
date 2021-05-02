const freqs = [
   0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966,
   0.00153, 0.00772, 0.04025, 0.02406, 0.06750, 0.07507, 0.01929, 0.00095, 0.05987,
   0.06327, 0.09056, 0.02758, 0.00978, 0.02360, 0.00150, 0.01974, 0.00074,
];
const alpha = 'abcdefghijklmnopqrstuvwxyz';

const counts = freqs.map(val => Math.round(val * 256));
console.log(counts);
let mixStr = '';
for (let ii = 0; ii < 26; ii = ii + 1) {
   const letter = alpha[ii];
   const count = counts[ii];
   mixStr = mixStr + letter.repeat(count);
}
console.log(alpha);
console.log(counts);
console.log(mixStr);

import * as mathjs from 'mathjs';

const distLen = mixStr.length;
const mixDist: string[] = []; // new Array(256);
mixDist[distLen - 1] = '';
console.log(distLen);
for (let ii = 0; ii < distLen; ii = ii + 1) {
   mixDist[ii] = mixStr[ii];
}

// mixDist[253] = alpha[Math.round(mathjs.random(0, 25))];
// mixDist[254] = alpha[Math.round(mathjs.random(0, 25))];
mixDist[255] = alpha[Math.round(mathjs.random(0, 25))];

// console.log(mixDist);

let swap: string;
for (let ii = 0; ii < distLen; ii = ii + 1) {
   const target = Math.round(mathjs.random(ii, distLen));
   if (target !== ii) {
      swap = mixDist[target];
      mixDist[target] = mixDist[ii];
      if (mathjs.random(0, 1) < 0.25) {
         mixDist[ii] = swap.toUpperCase();
      } else {
         mixDist[ii] = swap;
      }
      console.log(mixDist[ii], mixDist[target]);
   } else if (mathjs.random(0, 1) < 0.25) {
      mixDist[ii] = mixDist[ii].toUpperCase();
   }
}
let mixRun: string = mixDist.join('');
console.log(mixRun);
while (mixRun.length >= 14) {
   const rangeEnd = Math.round(mathjs.random(4, 10));
   const next = mixRun.substring(0, rangeEnd);
   mixRun = mixRun.substring(rangeEnd, mixRun.length - 1);
   console.log(next, mixRun.length);
}
// console.log(mixDist.join(''));
