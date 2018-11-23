// import * as assert from 'assert';
// import * as co-limit from '../src/index';

import '@jchptf/reflection';
import {ConcurrentWorkFactory} from '../src/services';
import {expect} from 'chai';
import sinon = require('sinon');
import Queue from 'co-priority-queue';
import {Chan, CLOSED} from 'medium';
import {SinonSpy} from 'sinon';

describe('ConcurrentWorkFactory', () => {
   let factory: ConcurrentWorkFactory;

   beforeEach(() => {
      factory = new ConcurrentWorkFactory();
   });

   describe('createPriorityQueue', () => {
      it('Returns a queue', () => {
         const output = factory.createPriorityQueue();
         console.log(output.constructor);
         console.log(output.constructor.name);
         expect(output).is.instanceOf(Queue);
      })
   });

   describe('loadToChan', () => {
      let iterSource: Array<number>;
      let iterIterSpy: SinonSpy;
      let retChan: Chan<number>;

      beforeEach(() => {
         iterSource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
         iterIterSpy = sinon.spy(iterSource[Symbol.iterator]);
         iterSource[Symbol.iterator] = iterIterSpy;
      });

      it('Populates up to backlog without a read', () => {
         retChan = factory.createChan();
         factory.loadToChan(iterSource, 1, retChan, 3);
         let iterIter: IterableIterator<number> = iterIterSpy.returnValues[0];

         setTimeout(() => {
            // 1, 2, and 3 should be in the queue, and 4 should be held in limbo,
            // making 5 the next iteration value.
            let nextIter = iterIter.next();
            expect(nextIter.value)
               .to
               .equal(5);

            retChan.then((_value: number|CLOSED): void => { })
               .catch((_err: any): void => { });
            retChan.then((_value: number|CLOSED): void => { })
               .catch((_err: any): void => { });

            setTimeout(() => {
               // Now, 3, 4, and 6 should be on the queue, with 7 held in limbo,
               // making 8 the next iteration value.
               nextIter = iterIter.next();
               expect(nextIter.value)
                  .to
                  .equal(8);
            }, 5);
         }, 5);
      })

      it('Makes concurrency concurrent attempts to provide a value.', () => {
         retChan = factory.createChan();
         factory.loadToChan(iterSource, 1, retChan, 3);
         let iterIter: IterableIterator<number> = iterIterSpy.returnValues[0];

         setTimeout(() => {
            // 1, 2, and 3 should be in the queue, and 4 should be held in limbo,
            // making 5 the next iteration value.
            let nextIter = iterIter.next();
            expect(nextIter.value)
               .to
               .equal(5);

            retChan.then((_value: number|CLOSED): void => { })
               .catch((_err: any): void => { });
            retChan.then((_value: number|CLOSED): void => { })
               .catch((_err: any): void => { });

            setTimeout(() => {
               // Now, 3, 4, and 6 should be on the queue, with 7 held in limbo,
               // making 8 the next iteration value.
               nextIter = iterIter.next();
               expect(nextIter.value)
                  .to
                  .equal(8);
            }, 5);
         }, 5);
      })

      it('Makes concurrency concurrent attempts to provide a value.', () => {
         retChan = factory.createChan();
         factory.loadToChan(iterSource, 1, retChan, 3);
         let iterIter: IterableIterator<number> = iterIterSpy.returnValues[0];

         /* 1, should be in the queue, and 2, 3, and 4 should be held in limbo, making 5 the next iteration value.*/
         setTimeout(() => {
            let nextIter = iterIter.next();
            expect(nextIter.value)
               .to
               .equal(5);

            retChan.then((_value: number|CLOSED): void => { })
               .catch((_err: any): void => { });
            retChan.then((_value: number|CLOSED): void => { })
               .catch((_err: any): void => { });

            setTimeout(() => {
               // Now, 3, 4, and 6 should be on the queue, with 7 held in limbo,
               // making 8 the next iteration value.
               nextIter = iterIter.next();
               expect(nextIter.value)
                  .to
                  .equal(8);
            }, 5);
         }, 5);
      })

      it('Terminates overflow workers', () => {
         let sinonSpy = sinon.spy(console.log);
         retChan = factory.createChan();
         factory.loadToChan(iterSource, 2, retChan, 10);

         setTimeout(() => {
            expect(sinonSpy.calledTwice).to.true;
         }, 5)
      })
   })
});
