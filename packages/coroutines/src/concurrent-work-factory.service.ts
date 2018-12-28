import {Injectable} from '@nestjs/common';
import {co, CoRoutineGenerator, WrappableCoRoutineGenerator, WrappedCoRoutineGenerator} from 'co';
import {buffers, Chan, chan, close, go, put, repeat, repeatTake, sleep} from 'medium';
import {identity, Transducer} from 'transducers-js';
import Queue from 'co-priority-queue';
import {SubscriptionLike} from 'rxjs';
import {AsyncSink} from 'ix';
import {illegalArgs} from '@thi.ng/errors';

import {asFunction, Limiter, SinkLike, AsyncTx, ChanBufferType} from './interfaces';
import {IConcurrentWorkFactory} from './interfaces/concurrent-work-factory.interface';

function isIterable<T>(sinkValue: any): sinkValue is Iterable<T>
{
   return sinkValue.hasOwnProperty(Symbol.iterator) || sinkValue.__proto__.hasOwnProperty(Symbol.iterator);
}

@Injectable()
export class ConcurrentWorkFactory implements IConcurrentWorkFactory
{
   constructor() { }

   createPriorityQueue<M>(): Queue<M>
   {
      return new Queue<M>();
   }

   createChan<T = any>(bufSize?: number, bufType?: ChanBufferType): Chan<T, T>
   {
      return this.createTxChan<T, T>(identity, bufSize, bufType);
   }

   createTxChan<T = any, M = T>(
      tx: Transducer<T, M>, bufSize: number = 0, bufType?: ChanBufferType): Chan<T, M>
   {
      if (bufSize < 0) {
         illegalArgs(`bufSize, ${bufSize}, may not be negative`);
      } else if ((!bufSize) && (!!bufType))
      {
         illegalArgs(`bufType, ${bufType}, must be undefined when bufSize is zero`);
      }

      if (bufSize > 0) {
         if (!bufType) {
            bufType = ChanBufferType.fixed;
         }

         switch (bufType) {
            case ChanBufferType.fixed:
            {
               return chan(buffers.fixed(bufSize), tx);
            }
            case ChanBufferType.dropping:
            {
               return chan(buffers.dropping(bufSize), tx);
            }
            case ChanBufferType.sliding:
            {
               return chan(buffers.sliding(bufSize), tx);
            }
            default:
            {
               illegalArgs(`Unknown buffer type: ${bufType}`);
            }
         }
      }

      return chan(undefined, tx);
   }

   createAsyncSink<T>() {
      return new AsyncSink<T>();
   }

   createLimiter(concurrency: number, defaultPriority: number = 10): Limiter
   {
      const queue: Queue<CoRoutineGenerator> =
         this.createPriorityQueue<CoRoutineGenerator>();

      // Create consumers
      for (let ii = 0; ii < concurrency; ii++) {
         co(function* () {
            while (true) {
               const yieldable: CoRoutineGenerator = yield queue.next();
               yield co(yieldable);
            }
         })
            .catch(function (err) {
               console.error(err.stack);
            });
      }

      return function limit<F extends WrappableCoRoutineGenerator<R, P> = WrappableCoRoutineGenerator<R, P>,
         R extends any = any,
         P extends any[] = any[]>(
         generator: F, priority: number = defaultPriority): WrappedCoRoutineGenerator<F, R, P>
      {
         const wrapped: WrappedCoRoutineGenerator<F, R, P> = co.wrap<F, R, P>(generator);

         return function (...args: P): Promise<R> {
            return new Promise<R>(
               (resolve, reject) => {
                  queue.push(function* () {
                     try {
                        resolve(yield wrapped(...args));
                     } catch (err) {
                        reject(err);
                     }
                  }, priority);
               }
            );
         }
      };
   }

   // public createAltLimiter(concurrency: number, defaultPriority: number = 10): Limiter
   // {
   //       const queue = new Queue();
   //
   //       // Create consumers
   //       for (var i = 0; i < concurrency; i++) {
   //          co(function *() {
   //             while (true) {
   //                const yieldable = yield queue.next();
   //                yield co(yieldable);
   //             }
   //          }).catch(function(err) {
   //             console.error(err.stack);
   //          });
   //       }
   //
   //    return function limit<F extends WrappableCoRoutineGenerator<R, P> = WrappableCoRoutineGenerator<R,
   // P>, R extends any = any, P extends any[] = any[]>( generator: F, priority: number = defaultPriority):
   // WrappedCoRoutineGenerator<F, R, P> { const wrapped: WrappedCoRoutineGenerator<F, R, P> = co.wrap<F,
   // R, P>(generator); return function(cb) { const wrapped = co.wrap(generator); queue.push(function* () {
   // try { cb(undefined, yield wrapped()); } catch(err) { cb(err); }  return; }, priority); }; }; }; }

   // public altGetLimitedTask<F extends WrappableCoRoutineGenerator<R, P> = WrappableCoRoutineGenerator<R,
   // P>, R = any, P extends any[] = any[]>( coWrappable: F, concurrency: number):
   // WrappedCoRoutineGenerator<F, R, P> { return this.getTaskLimiter(concurrency, 10)(coWrappable); }

   public createLimitedTask<F extends WrappableCoRoutineGenerator<R, P> = WrappableCoRoutineGenerator<R, P>,
      R extends any = any,
      P extends any[] = any[]>(coWrappable: F, concurrency: number): WrappedCoRoutineGenerator<F, R, P>
   {
      type QueueMsg = {
         args: P;
         resolve: (value: R) => void;
         reject: (err: any) => void;
      };

      // There are no semantics here that enable setting different priorities for different tasks, but
      // priority queue API requires us to provide a value, so every task submitted through this code
      // path will use the following fixed and arbitrary priority value.
      const fixedPriority: number = 10;

      const queue: Queue<QueueMsg> =
         this.createPriorityQueue<QueueMsg>();
      const wrappedCo: WrappedCoRoutineGenerator<F, R, P> =
         co.wrap<F, R, P>(coWrappable);

      // Create consumers
      for (let ii = 0; ii < concurrency; ii++) {
         co(function* () {
            while (true) {
               const msg: QueueMsg = yield queue.next();
               try {
                  const retVal: R = yield wrappedCo(...msg.args);
                  msg.resolve(retVal);
               } catch (err) {
                  msg.reject(err);
               }
            }
         })
            .catch(function (err) {
               console.error(err.stack);
            });
      }

      return function (...args: P): Promise<R> {
         return new Promise<R>(
            (resolve, reject) => {
               queue.push({
                  args,
                  resolve,
                  reject
               }, fixedPriority);
            }
         );
      }
   };

   /*
   createSourceLoader<T, M = T>(
      iterator: IterableIterator<T>, concurrency: number, backlog: number,
      transform?: WrappableCoRoutineGenerator<M, [T]>): Chan.Chan<M>
   {
      const retChan: Chan.Chan<M> = chan<M>(backlog);
      let applyTransform: WrappedCoRoutineGenerator<(args: T) => IterableIterator<any>, M, [T]>;
      let globalDone: boolean = false;

      if (!!transform) {
         applyTransform = co.wrap<typeof transform, M, [T]>(transform);
      } else {
         applyTransform = co.wrap(function* (value: T): IterableIterator<any> {
            return value as unknown as M;
         });
      }
      let sendToChan = co.wrap(
         function* (value: T): IterableIterator<any> {
            const transformedValue: M = yield applyTransform(value);
            yield retChan(transformedValue);
         }
      );

      function* queueFromIterator()
      {
         if (globalDone) {
            return;
         }

         do {
            let localIterResult = iterator.next();
            if (localIterResult.done) {
               globalDone = true;
            }
            // yield retChan(localIterResult.value);
            yield localIterResult.value;
         } while (!globalDone);
      }

      for (let ii = 0; ii < concurrency; ii++) {
         const workerId = ii;
         co(function* (): IterableIterator<any> {
            for (let value of queueFromIterator()) {
               yield sendToChan(value);
            }
         })
            .then(function () {
               console.log(`Concurrent worker #${workerId} signalled complete`);
            })
            .catch(function (err: any) {
               console.error(`Concurrent worker #${workerId} exited abnormally: ${err}`);
            });
      }

      return retChan;
   }
   */

   transformToSink<T, M = T>(
      source: Chan<any, T>, transform: (input: T) => Promise<M>,
      concurrency: number, sink: SinkLike<M>): void
   {
      let toSink = asFunction<M>(sink);

      for (let ii = 0; ii < concurrency; ii++) {
         const workerId = ii;
         repeatTake(
            source,
            async function(value: T, tx: AsyncTx<T, M> | AsyncTx<T, Iterable<M>>): Promise<false | AsyncTx<T, M> | AsyncTx<T, Iterable<M>>> {
               const transformed = await tx(value);
               if (isIterable(transformed)) {
                  for (const sinkValue of transformed) {
                     toSink(sinkValue);
                  }
               } else {
                  toSink(transformed);
               }

               return tx;
            },
            transform
         )
            .then(
               function () {
                  console.log(`Concurrent worker #${workerId} signalled complete`);
               }
            )
            .catch(
               function (err: any) {
                  console.error(`Concurrent worker #${workerId} exited abnormally: ${err}`);
               }
            );
      }
   }

   transformToChan<T, M = T>(
      source: Chan<any, T>, transform: AsyncTx<T, M> | AsyncTx<T, Iterable<M>>,
      concurrency: number, chan: Chan<M, any>): void
   {
      for (let ii = 0; ii < concurrency; ii++) {
         const workerId = ii;
         repeatTake(
            source,
            async function(value: T, tx: AsyncTx<T, M> | AsyncTx<T, Iterable<M>>): Promise<false | AsyncTx<T, M> | AsyncTx<T, Iterable<M>>> {
               const transformed = await tx(value);
               if (isIterable(transformed)) {
                  for (const sinkValue of transformed) {
                    await put(chan, sinkValue);
                  }
               } else {
                  await put(chan, transformed);
               }

               return tx;
            },
            transform
         )
            .then(
               function () {
                  console.log(`Concurrent worker #${workerId} signalled complete`);
               }
            )
            .catch(
               function (err: any) {
                  console.error(`Concurrent worker #${workerId} exited abnormally: ${err}`);
               }
            );
      }
   }

   /*
   createStageHandler<T, M = T>(
      source: Chan<any, T>, transform: WrappableCoRoutineGenerator<M, [T]>,
      concurrency: number, sink: SinkLike<M>): void
   {
      let applyTransform: WrappedCoRoutineGenerator<typeof transform, M, [T]> =
         co.wrap<typeof transform, M, [T]>(transform);
      let toSink = asFunction<M>(sink);
      let sendToSink = co.wrap(
         function* (value: T): IterableIterator<any> {
            const transformedValue: M = yield applyTransform(value);
            toSink(transformedValue);
         }
      );

      for (let ii = 0; ii < concurrency; ii++) {
         const workerId = ii;
         co(function* (): IterableIterator<any> {
            while (true) {
               const input = yield source;
               yield sendToSink(input);
            }
         })
            .then(function () {
               console.log(`Concurrent worker #${workerId} signalled complete`);
            })
            .catch(function (err: any) {
               console.error(`Concurrent worker #${workerId} exited abnormally: ${err}`);
            });
      }
   }
   */

   loadToChan<T>(
      iterable: Iterable<T>|AsyncIterable<T>, concurrency: number, chan: Chan<T, any>, delay: number = 0): SubscriptionLike
   {
      let globalDone: boolean = false;
      const iterator = (isIterable(iterable)) ? iterable[Symbol.iterator]() : iterable[Symbol.asyncIterator]();

      async function queueFromIterator(localIterResult: IteratorResult<T>|Promise<IteratorResult<T>>): Promise<IteratorResult<T> | false>
      {
         let thisResult: IteratorResult<T> = await localIterResult;
         let nextResult: IteratorResult<T> | false = false;

         if (thisResult.done) {
            globalDone = true;
         } else {
            await put(chan, thisResult.value);

            if (delay > 0) {
               await sleep(delay);
            }
            const nextAsyncResult = iterator.next();
            nextResult = await nextAsyncResult;
         }

         return nextResult;
      }

      for (let ii = 0; ii < concurrency; ii++) {
         const workerId = ii;
         if (!globalDone) {
            repeat(queueFromIterator, iterator.next())
               .then(function () {
                  console.log(`Concurrent worker #${workerId} signalled complete`);
               })
               .catch(function (err: any) {
                  console.error(`Concurrent worker #${workerId} exited abnormally: ${err}`);
               });
         } else {
            console.log(`Concurrent worker #${workerId} signalled complete`);
         }
      }

      return {
         unsubscribe: (): void => {
            globalDone = true;
         },

         get closed(): boolean { return globalDone; }
      };
   }

   loadToSink<T>(
      iterable: Iterable<T>|AsyncIterable<T>, concurrency: number, sink: AsyncSink<T>, delay: number = 0): SubscriptionLike
   {
      let globalDone: boolean = false;
      const iterator = (isIterable(iterable)) ? iterable[Symbol.iterator]() : iterable[Symbol.asyncIterator]();

      async function queueFromIterator(
         localIterResult: IteratorResult<T>|Promise<IteratorResult<T>>): Promise<IteratorResult<T> | false>
      {
         let thisResult: IteratorResult<T> = await localIterResult;
         let nextResult: IteratorResult<T> | false = false;

         if (thisResult.done) {
            globalDone = true;
         } else {
            sink.write(thisResult.value);
            const nextAsyncResult = iterator.next();
            await sleep(delay);
            nextResult = await nextAsyncResult;
         }

         return nextResult;
      }

      for (let ii = 0; ii < concurrency; ii++) {
         const workerId = ii;
         if (!globalDone) {
            repeat(queueFromIterator, iterator.next())
               .then(function () {
                  console.log(`Concurrent worker #${workerId} signalled complete`);
               })
               .catch(function (err: any) {
                  console.error(`Concurrent worker #${workerId} exited abnormally: ${err}`);
               });
         } else {
            console.log(`Concurrent worker #${workerId} signalled complete`);
         }
      }

      return {
         unsubscribe: (): void => {
            globalDone = true;
         },

         get closed(): boolean { return globalDone; }
      };
   }


   /*
   public run<T>(source: Iterable<T>|AsyncIterable<T>, sink: AsyncSink<T>, delay: number = 0): SubscriptionLike
   {
      const sourceIter = (isIterable(source)) ? source[Symbol.iterator]() : source[Symbol.asyncIterator]();
      // const toSink = asFunction(sink);

      return this.scheduler.schedule<Iterator<T>>(
         function (this: SchedulerAction<Iterator<T>>, state?: Iterator<T>): void {
            const iterResult = state!.next();
            if (! iterResult.done) {
               sink.write(iterResult.value);
               this.schedule(state, delay);
            } else {
               sink.end();
            }
         }, delay, sourceIter
      )
   }
   */

   // public cycle<T>(source: Iterable<T>, sink: AsyncSink<T>, delay: number = 0): SubscriptionLike
   // {
   //    const sourceIter: Iterator<T> = source[Symbol.iterator]();
   //
   //    return this.scheduler.schedule<Iterator<T>>(
   //       function (this: SchedulerAction<Iterator<T>>, state?: Iterator<T>): void {
   //          const iterResult = state!.next();
   //          if (! iterResult.done) {
   //             sink.write(iterResult.value);
   //
   //             this.schedule(state, delay);
   //          } else {
   //             this.schedule(source[Symbol.iterator](), delay)
   //          }
   //       }, delay, sourceIter
   //    )
   // }

   // private static readonly CLOSED: symbol = Symbol.for('closed');

   public unwind<T>(master: AsyncSink<Iterable<T>>, sink: AsyncSink<T>, delay: number = 0): SubscriptionLike
   {
      const sources: Chan<Iterator<T>> = chan<Iterator<T>>();
      const items: Chan<T> = chan<T>();
      let closed: boolean = false;
      const retVal = {
         unsubscribe: () => {
            close(sources);
            close(items);
            closed = true;
         },

         get closed(): boolean { return closed; }
      };

      go(async function() {
         for await (let nextIterable of master) {
            if (closed) {
               console.log('Master iterables source still open on unsubscribe');
               return;
            }
            await put(sources, nextIterable[Symbol.iterator]());
         }
         console.log('Master iterables source closed');
         retVal.unsubscribe();
      }).then(function() {
         console.log('Done reading from master iterables');
      }).catch(function(err: any) {
         console.error(err);
         retVal.unsubscribe();
      });

      repeatTake(sources, async (nextIterator: Iterator<T>) => {
         let nextIterResult: IteratorResult<T> = nextIterator.next();
         if (! nextIterResult.done) {
            await put(items, nextIterResult.value);
            await put(sources, nextIterator);
         }
      }).then(console.log)
         .catch(console.error);

      repeatTake(items, async (value: T) => {
         sink.write(value);
         await sleep(delay);
      }).then(console.log)
         .catch(console.error);

      // const retVal: Subscription = this.scheduler.schedule<Chan<T>>(
      //    function (this: SchedulerAction<Chan<T>>, state?: Chan<T>): void {
      //       take(state!).then(
      //          (value: T|CLOSED) => {
      //             if (value !== CLOSED) {
      //                sink.write(value as T);
      //                this.schedule(state, delay);
      //             }
      //          }
      //       ).catch(console.error.bind(console));
      //    }, delay, items
      // );
      //
      // retVal.add((): void => {
      //    close(sources);
      //    close(items)
      // });

      return retVal;
   }

   public service<I, O>(source: Chan<any, I>, sink: Chan<I, O>, concurrency: number = 1): void
   {
      for (let ii = 0; ii < concurrency; ii++) {
         repeatTake(source, async (value: I) => {
            await put(sink, value);
         });
      }
   }

   public serviceMany<I, O>(source: Chan<any, I[]>, sink: Chan<I, O>, concurrency: number = 1): void
   {
      for (let ii = 0; ii < concurrency; ii++) {
         repeatTake(source, async (value: I[]) => {
            for (let innerValue of value) {
               await put(sink, innerValue);
            }
         });
      }
   }
}


// export function createQueueFactory<T = any>(_context: interfaces.Context): ConcreteFactory<Queue<T>,
// [PropertyKey?]> { return (key?: PropertyKey): Queue<T> => { let retVal: Queue<T>;  if (!!key) { if
// (_context.container.isBoundNamed(CO_TYPES.Queue, key)) { retVal =
// _context.container.getNamed(CO_TYPES.Queue, key); } else { retVal = new Queue<T>();
// _context.container.bind(CO_TYPES.Queue).toConstantValue(retVal).whenTargetNamed(key); } } else { retVal
// = new Queue<T>(); }  return retVal; } }  export const queueFactoryCreator:
// interfaces.FactoryCreator<Queue<any>> = createQueueFactory;