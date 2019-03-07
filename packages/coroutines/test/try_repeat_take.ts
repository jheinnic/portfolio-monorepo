import { Chan, chan, put, repeatTake } from 'medium';

// type SyncOrAsync<T> = T | Promise<T>;

const ctrl: Chan<number[], number[]> =
   chan<number[], number[]>();

function makePromise(ref: number): number|Promise<number> {
   if ( (ref % 2) === 1) {
      return new Promise(
         (resolve, reject) => {
            setTimeout(() => {
               console.log(ref, 10000);
               resolve(10000);
               console.log(10000, ref);
            }, 10000);
            setTimeout(() => {
               console.error('error', ref, 15000);
               reject(15000);
               console.error('error', 15000, ref);
            }, 15000);
         });
   }

   return ref * 100;
}

function tryIt(value: number[], seed: number): number|Promise<number>|false {
   console.log(value, seed);

   if (value[0] === 7) {
      console.warn(false, seed);
      return false;
      // return Promise.resolve(false);
   }

   return makePromise(value[0]);
   // return Promise.resolve( true );
      // value.toString(16)
   // );
}

// @ts-ignore
repeatTake<number[], number>(
   ctrl, tryIt, makePromise(-1)
).then(
   function() {
      console.log('repeatTake ends');
   }
).catch(
   function(err: any) {
      console.error('repeatTake fails', err);
   }
);

async function addWork() {
   await put(ctrl, [1, 2]);
   console.log('Added 1');
   await put(ctrl, [2, 3]);
   console.log('Added 2');
   await put(ctrl, [3, 4]);
   console.log('Added 3');
   await put(ctrl, [4, 5]);
   console.log('Added 4');
   await put(ctrl, [5, 6]);
   console.log('Added 5');
   await put(ctrl, [7, 8]);
   console.log('Added 7');
   await put(ctrl, [9, 10]);
   console.log('Added 9');
   await put(ctrl, [11, 12]);
   console.log('Added 11');
   await put(ctrl, [13, 14]);
   console.log('Added 13');
}

addWork().then(
   function() {
      console.log('Done adding work');
   }
).catch(
   function() {
      console.error('Failed adding work');
   }
);

