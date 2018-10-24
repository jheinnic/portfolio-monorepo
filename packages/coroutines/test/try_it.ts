import {co} from 'co';
import {limiter} from '../src';

const limit = limiter(3);

function wait(ms: number) {
   return function(done: Function) {
      setTimeout(done, ms);
   }
}

function* job(): IterableIterator<any> {
   console.log('Doing something...');
   yield wait(1000);
   return 5;
}

const hiLimitJob = limit(job, 10);
const midLimitJob = limit(job, 5);
const loLimitJob = limit(job, 1);

co(function* () {
   const retVal = [];
   for (var i = 0; i < 10; i++) {
      retVal.push(loLimitJob().then((value) => {
         console.log('Lo: ', value);
         return value;
      }));
      retVal.push(midLimitJob().then((value) => {
         console.log('Mid: ', value);
         return value;
      }));
      retVal.push(hiLimitJob().then((value) => {
         console.log('Hi: ', value);
         return value;
      }));
   }
   const fook: Promise<number> = hiLimitJob(); // .then((value: number) => {
      // console.log('Hi2: ', value);
      // return value;
   // });
   retVal.push(fook);
   retVal.push(hiLimitJob().then((value) => {
      console.log('Hi2: ', value);
   }));

   return yield retVal;
}).then(console.log);
