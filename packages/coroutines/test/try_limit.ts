import { ConcurrentWorkFactory, ILimiter } from '@jchptf/coroutines';
import { sleep } from 'medium';

const concurrency: number = 50;
const jobCount: number = 25000;

const results: Promise<number>[] = new Array<Promise<number>>(jobCount);

const wf = new ConcurrentWorkFactory();

let activeWorkerCount = 0;

async function doWork(input: number): Promise<number> {
   activeWorkerCount = activeWorkerCount + 1;
   console.log(`At start of work, there are now ${activeWorkerCount} active workers`);
   const sleepTime = Math.round(25 * Math.random());
   await sleep(sleepTime);
   activeWorkerCount = activeWorkerCount - 1;
   // await sleep(sleepTime / 2);
   console.log(`On completing work, there are now ${activeWorkerCount} active workers`);
   return input * 2;
}

const limiter: ILimiter = wf.createLimiter(concurrency, 10);
const limitedDoWork = limiter(doWork, 5);

for (let ii = 0; ii < jobCount; ii++) {
   results[ii] = limitedDoWork(ii);
}

Promise.all(results).then(
   (values: any) => {
      console.log('Done', values);
   },
).catch(
   (err: any) => {
      console.error('Error', err);
   },
);
