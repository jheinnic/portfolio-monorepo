import {ConcurrentWorkFactory} from '../src/concurrent-work-factory.service';
import {AsyncSink} from 'ix';

const input1: number[] = [];
const input2: number[] = [];
const input3: Array<number> = [];

const wf = new ConcurrentWorkFactory();

for (let ii=0; ii<2000; ii++) {
   input1[ii] = input2[ii] = input3[ii] = ii;
}

const asIn = new AsyncSink<Iterable<number>>();
const asOut = new AsyncSink<number>();

async function devour(sink: AsyncSink<any>) {
   for await (let nextItem of sink) {
      console.log(nextItem);
   }
}

const devourPromise = devour(asOut);
const unwindPromise = wf.unwind(asIn, asOut, 40);

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