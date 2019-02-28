import { Chan, close, sleep, take } from 'medium';

import * as chai from 'chai';
import lolex, { Clock } from 'lolex';
import sinon, { SinonSandbox, SinonSpy, SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';

import '@jchptf/reflection';
import { ConcurrentWorkFactory } from '@jchptf/coroutines';
import { LoadToChan } from './fixtures/load-to-chan.constants';
import { LoadToChanScriptDirector } from './utilities/load-to-chan-script-director.class';

chai.use(sinonChai);
const expect = chai.expect;

describe('ConcurrentWorkFactory', () => {
   let factory: ConcurrentWorkFactory;
   let sandbox: SinonSandbox;
   let clock: Clock;

   let scriptDirector: LoadToChanScriptDirector;

   // This test case will periodically need to yield flow control back to the event loop
   // in order to allow the timers in ConcurrentWorkFactory that it is asserting
   // conditions on to have opportunity to fire.  We cannot manipulate Lolex's virtual
   // tick count while surrendering flow control, so we must enable Lolex's
   // "shouldAdvanceTime" option to allow the clock to move in something very close to
   // "real time" while the test case is asleep.
   //
   // Lolex.tick() is still used to roll the virtual clock forward to skip over
   // non-trivial spans of time without the actual passage of time.  The strategy

   beforeEach(() => {
      sandbox = sinon.createSandbox();
      factory = new ConcurrentWorkFactory();

      clock = lolex.install({
         shouldAdvanceTime: true,
         advanceTimeDelta: 8
      });
   });

   afterEach(function () {
      clock.uninstall();
   });

   // describe('createPriorityQueue', () => {
   //    it('Returns a queue', () => {
   //       const output = factory.createPriorityQueue();
   //       expect(output)
   //          .is
   //          .instanceOf(Queue);
   //    })
   // });

   describe('loadToChan', () => {
      let iterSource: Array<number>;
      let realIterator: IterableIterator<number>;
      // let nextIter: IteratorResult<number>;

      let iterSourceIteratorStub: SinonStub;
      let spiedUponIteratorNext: SinonSpy;
      let retChan: Chan<number, any>;
      // let spiedUponReturnChan: SpiedUponInstance<Chan<number, any>>;

      beforeEach(() => {
         iterSource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
         realIterator = iterSource[Symbol.iterator]();

         // The spyOn() mock adaptation can only find and replace string properties, so we have to
         // deal with spying on Symbol.iterator uniquely...  :(
         iterSourceIteratorStub = sandbox.stub();
         spiedUponIteratorNext = sandbox.spy(realIterator, 'next');

         // Configure spy/stub behavior that is uniform here.
         iterSourceIteratorStub.onFirstCall()
            .returns(realIterator);
         iterSource[Symbol.iterator] = iterSourceIteratorStub;

      });

      afterEach(() => {
         sandbox.reset();
         clock.uninstall();
         close(retChan);
      });

      it('Populates concurrency reads then blocks once foreach record read', async () => {
         retChan = factory.createChan();
         factory.loadToChan(
            iterSource,
            LoadToChan.loadConcurrency,
            retChan,
            LoadToChan.withoutDelayMs);

         // Let the clock roll forward until anything currently scheduled has resolved.

         // 1, 2, and 3 should be in the queue, and 4 should be the next value
         // waiting to be read because concurrency factor was set to 3.
         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(3);

         // Read the output channel twice, which should cause two workers to
         // unblock long enough to take 4 and 5 off input iterable, then re-block
         // waiting to send them to a reader on Chan.
         expect(
            await take(retChan)
         )
            .to
            .be
            .equal(1);
         expect(
            await take(retChan)
         )
            .to
            .be
            .equal(2);

         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(5);

         expect(
            await take(retChan)
         )
            .to
            .be
            .equal(3);
         expect(
            await take(retChan)
         )
            .to
            .be
            .equal(4);
         expect(
            await take(retChan)
         )
            .to
            .be
            .equal(5);

         clock.runAll();
         clock.runToLast();

         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(8);
      });

      it('Waits for a specified delay before reading next value if so configured.', async () => {
         retChan = factory.createChan();
         scriptDirector = new LoadToChanScriptDirector(
            expect, clock, LoadToChan.realTimeDelta, spiedUponIteratorNext, retChan);
         factory.loadToChan(
            iterSource, LoadToChan.loadConcurrency,
            retChan, LoadToChan.withDelayMs);

         scriptDirector.runScript(LoadToChan.noBufferWithDelayScript);

         // 1, 2, and 3 should be in the queue, and 4 should be the next value
         // waiting to be read.
         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(3);

         // Read the output channel once, which will start the 50 ms clock before
         // 4 gets read.  Tick the clock forward by 40 and confirm 4 has not yet
         // been read, then read a second value and wait another 20ms.
         expect(
            await take(retChan)
         )
            .to
            .be
            .equal(1);

         // Briefly yield flow control so the first read can process its occurrence
         // and promptly re-cue its next interval.  Make sure we still have not fired
         // its resolution yet on return.
         clock.tick(5 - clock.now);
         await sleep(10 - clock.now);
         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(3);

         // Read a second time, starting a second delay timer.  Then advance clock
         // to just before the first read's delay will lapse and briefly yield the CPU.
         // Verify no fourth read has happened still just before yielding.
         clock.tick(30 - clock.now);
         expect(
            await take(retChan)
         )
            .to
            .be
            .equal(2);
         await sleep(35 - clock.now);
         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(3);

         // Let the first delay lapse and verify its read has occurred when we get the
         // flow of control back.
         clock.tick(54 - clock.now);
         await sleep(58 - clock.now);
         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(4);

         // Fast forward to just before the second delay expires and verify it occurs
         // correctly.
         clock.tick(78 - clock.now);
         await sleep(82 - clock.now);
         console.log(clock.now);
         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(5);
      });

      it('Resolves multiple overlapping delays in parallel', async () => {
         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(0);

         factory.loadToChan(iterSource, 3, retChan, 50);

         // Now, empty the queue all at once.
         clock.tick(3600 - clock.now)
         expect(
            await take(retChan)
         )
            .to
            .be
            .equal(1);
         expect(
            await take(retChan)
         )
            .to
            .be
            .equal(2);
         expect(
            await take(retChan)
         )
            .to
            .be
            .equal(3);
         await sleep(3605 - clock.now);
         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(3);

         // And watch for the delayed refresh read
         clock.tick(3642 - clock.now);
         await sleep(3645 - clock.now);
         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(3);

         await sleep(3652 - clock.now);
         expect(spiedUponIteratorNext)
            .to
            .have
            .callCount(6);
      });

      it('Terminates overflow workers', () => {
         let sinonSpy = sinon.spy(console.log);
         retChan = factory.createChan();
         factory.loadToChan(iterSource, 2, retChan, 10);

         setTimeout(() => {
            expect(sinonSpy.calledTwice).to.true;
         }, 5)
      })
   })
})
