import {ConcurrentWorkFactory} from '@jchptf/coroutines';
import {AsyncSink} from 'ix';
import { Chan, CLOSED, take } from 'medium';

const input1: number[] = [];
const input2: number[] = [];
const input3: Array<number> = [];

const wf = new ConcurrentWorkFactory();

for (let ii=0; ii<2000; ii++) {
   input1[ii] = input2[ii] = input3[ii] = ii;
}

const asIn = new AsyncSink<Iterable<number>>();
const asOut = wf.createChan();

// async function devourSink(sink: AsyncSink<any>) {
//    for await (let nextItem of sink) {
//       console.log(nextItem);
//    }
// }
async function devour(channel: Chan<any, any>) {
   let retVal: any|CLOSED;
   do {
      retVal = await take(channel);
      console.log(retVal);
   } while (retVal !== CLOSED);
}

const devourPromise = devour(asOut);
const unwindPromise = wf.unwind(asIn, asOut, undefined, 40);

asIn.write(input1);

Promise.all([devourPromise, unwindPromise]).then(
   (values: any) => {
      console.log('Done', values);
   }
).catch(
   (err: any) => {
      console.error('Error', err);
   }
);

setTimeout( () => {
   asIn.write(input2);
   asIn.write(input3);
}, 1200);