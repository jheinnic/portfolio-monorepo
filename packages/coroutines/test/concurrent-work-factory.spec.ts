// import * as assert from "assert";
// import * as co-limit from "../src/index";

import '@jchptf/reflection';
import {ConcurrentWorkFactory} from '../src/services';
import {expect} from 'chai';
import sinon = require('sinon');

describe('ConcurrentWorkFactory', () => {
   let factory: ConcurrentWorkFactory;

   beforeEach(() => {
      factory = new ConcurrentWorkFactory();
   })

   describe('createSourceLoader', () => {
      let iterSource: number[];
      let iterIter: IterableIterator<number>;
      let retChan: Chan.Chan<number>;

      beforeEach(() => {
         iterSource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
         iterIter = iterSource[Symbol.iterator]();
      });

      it('Populates up to backlog without a read', () => {
         retChan = factory.createSourceLoader(iterIter, 1, 3);
         setTimeout(() => {
            // 1, 2, and 3 should be in the queue, and 4 should be held in limbo,
            // making 5 the next iteration value.
            let nextIter = iterIter.next();
            expect(nextIter.value)
               .to
               .equal(5);

            retChan((_err: any, _value: number) => {
            });
            retChan((_err: any, _value: number) => {
            });

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
         retChan = factory.createSourceLoader(iterIter, 3, 1);
         setTimeout(() => {
            // 1, should be in the queue, and 2, 3, and 4 should be held in limbo,
            // making 5 the next iteration value.
            let nextIter = iterIter.next();
            expect(nextIter.value)
               .to
               .equal(5);

            retChan((_err: any, _value: number) => {
            });
            retChan((_err: any, _value: number) => {
            });

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

      it("Terminates overflow workers", () => {
         let sinonSpy = sinon.spy(console.log);
         retChan = factory.createSourceLoader(iterIter, 2, 10);
         setTimeout(() => {
            expect(sinonSpy.calledTwice).to.true;
         }, 5)
      })
   })
});
