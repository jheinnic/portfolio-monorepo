import { Injectable } from '@nestjs/common';
import { buffers, Chan, chan, go, put, repeat, repeatTake, sleep } from 'medium';
import { identity, Transducer } from 'transducers-js';
import { SubscriptionLike } from 'rxjs';
import { AsyncSink } from 'ix';
import { FibonacciHeap, INode } from '@tyriar/fibonacci-heap';
import { illegalArgs } from '@thi.ng/errors';

import { AsyncTx } from '@jchptf/txtypes';
import { IAdapter } from '@jchptf/api';

import {
   asFunction, ChanBufferType, IConcurrentWorkFactory, ILimiter, SinkLike, IterPair
} from './interfaces';
import { IChanMonitor } from './interfaces/chan-monitor.interface';
import { ChanMonitor } from './chan-monitor.class';
import { PromiseHandlers } from './interfaces/promise-handlers.interface';

function isIterable<T>(sinkValue: any): sinkValue is Iterable<T>
{
   return sinkValue.hasOwnProperty(Symbol.iterator) || sinkValue.__proto__.hasOwnProperty(
      Symbol.iterator);
}

function isAsyncIterable<T>(sinkValue: any): sinkValue is AsyncIterable<T>
{
   return sinkValue.hasOwnProperty(Symbol.asyncIterator) || sinkValue.__proto__.hasOwnProperty(
      Symbol.asyncIterator);
}

/**
 * Medium's seeded repeat*() methods cannot use plain booleans as their seed argument type
 * because 'false' would have ambiguous meaning due to its use in signalling end-of-iteration.
 *
 * We cannot patch Medium to use a symbol or other non-ambiguous value to signal end-of-iteration,
 * but we can provide a boolean-equivalent enum for use as a seed argument type when boolean
 * semantics are desired.
 */
enum MediumSeedBoolean {
   FALSE,
   TRUE
}

@Injectable()
export class ConcurrentWorkFactory implements IConcurrentWorkFactory
{
   constructor() { }

   // createPriorityQueue<M>(): Queue<M>
   // {
   //    return new Queue<M>();
   // }

   createChan<T = any>(
      bufSize?: number, bufType?: ChanBufferType
   ): IAdapter<Chan<T, T>>
   {
      return this.createTxChan<T, T>(identity, bufSize, bufType);
   }

   createTxChan<T = any, M = T>(
      tx: Transducer<T, M>, bufSize: number = 0, bufType?: ChanBufferType
   ): IAdapter<Chan<T, M>>
   {
      if (bufSize < 0) {
         illegalArgs(`bufSize, ${bufSize}, may not be negative`);
      } else if ((!bufSize) && (!!bufType))
      {
         illegalArgs(`bufType, ${bufType}, must be undefined when bufSize is zero`);
      }

      let retVal: Chan<T, M>;
      if (bufSize > 0) {
         if (!bufType) {
            bufType = ChanBufferType.fixed;
         }

         switch (bufType) {
            case ChanBufferType.fixed:
            {
               retVal = chan(buffers.fixed(bufSize), tx);
               break;
            }
            case ChanBufferType.dropping:
            {
               retVal = chan(buffers.dropping(bufSize), tx);
               break;
            }
            case ChanBufferType.sliding:
            {
               retVal = chan(buffers.sliding(bufSize), tx);
               break;
            }
            default:
            {
               throw illegalArgs(`Unknown buffer type: ${bufType}`);
            }
         }

         return {
            unwrap: () => retVal
         };
      }

      retVal = chan(undefined, tx);

      return {
         unwrap: () => retVal
      };
   }

   createAsyncSink<T>()
   {
      return new AsyncSink<T>();
   }

   createLimiter(concurrency: number, defaultPriority: number = 10): ILimiter
   {
      const heap = new FibonacciHeap<number, () => Promise<void>>();
         new FibonacciHeap<number, () => Promise<void>>();
      const sink =
         this.createAsyncSink<void>();

      // Create consumers
      for (let ii = 0; ii < concurrency; ii++) {
         const consumerId = ii;
         go(async function () {
            let signal: void;
            for await (signal of sink) {
               const heapNode: INode<number, () => Promise<void>> | null =
                  heap.extractMinimum();
               const yieldable = heapNode!.value;
               if (!!yieldable) {
                  await yieldable();
               }
            }
         })
            .then(function () {
               console.log(`Consumer ${consumerId} has exited its loop`);
            })
            .catch(function (err: any) {
               console.error(err.stack);
            });
      }

      return function limit<Params extends any[], RetVal>(
         asyncFunction: AsyncTx<Params, RetVal>,
         priority: number = defaultPriority
      ): AsyncTx<Params, RetVal>
      {
         return async function (...args: Params): Promise<RetVal> {
            const deferredCall = new Promise<RetVal>(
               (resolve, reject) => {
                  heap.insert(priority, async function () {
                     try {
                        const retVal: RetVal = await asyncFunction(...args);
                        resolve(retVal);
                     } catch (err) {
                        reject(err);
                     }
                  });
               }
            );

            try {
               sink.write(undefined);
               return await deferredCall;
            } catch (err) {
               console.error('Failed to resolve limiter-deferred asynchronous call', err);
               throw err;
            }
         };
      };
   }

   /*
   TODO: Migrate this the same way that createLimiter was!
   public createLimitedTask<R extends any = any, P extends any[] = []>(
      coWrappable: WrappableCoRoutineGenerator<R, P>, concurrency: number
   ): WrappedCoRoutineGenerator<R, P>
   {
      // There are no semantics here that enable setting different priorities for different tasks, but
      // priority queue API requires us to provide a value, so every task submitted through this code
      // path will use the following fixed and arbitrary priority value.
      const fixedPriority: number = 10;

      const queue: Queue<MessageForReply<P, R>> =
         this.createPriorityQueue<MessageForReply<P, R>>();
      const wrappedCo: WrappedCoRoutineGenerator<R, P> =
         co.wrap<R, P>(coWrappable);

      // Create consumers
      for (let ii = 0; ii < concurrency; ii++) {
         co(function* () {
            while (true) {
               const msg: MessageForReply<P, R> = yield queue.next();
               try {
                  const retVal = yield wrappedCo(...msg.args);
                  msg.resolve(retVal);
               } catch (err) {
                  msg.reject(err);
               }
            }
         }).catch(function (err: any) {
            console.error(err.stack);
         });
      }

      return function (...args: P): Promise<R> {
         return new Promise<R>(
            (resolve, reject) => {
               queue.push(
                  { args, resolveHasParam: true, resolve, reject },
                  fixedPriority);
            }
         );
      }
   };
    */

   transformToSink<T, M = T>(
      source: Chan<any, T>,
      sink: SinkLike<M>,
      transform: AsyncTx<[T], M | Iterable<M> | AsyncIterable<M>>,
      concurrency: number = 1,
   ): void
   {
      let toSink = asFunction<M>(sink);

      for (let ii = 0; ii < concurrency; ii++) {
         const workerId = ii;
         const tx = transform;

         repeatTake(
            source,
            async function (value: T): Promise<false | void>
            {
               const transformed = await tx(value);

               if (isIterable<M>(transformed)) {
                  for (const sinkValue of transformed) {
                     toSink(sinkValue);
                  }
               } else if (isAsyncIterable<M>(transformed)) {
                  for await (const sinkValue of transformed) {
                     toSink(sinkValue);
                  }
               } else {
                  toSink(transformed);
               }
            }
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
      source: Chan<any, T>, chan: Chan<M, any>,
      transform: AsyncTx<[T], M | Iterable<M> | AsyncIterable<M>>,
      concurrency: number = 1
   ): void
   {
      for (let ii = 0; ii < concurrency; ii++) {
         const workerId = ii;
         const tx = transform;

         repeatTake(
            source,
            async function (value: T): Promise<false | void>
            {
               const transformed = await tx(value);

               if (isIterable(transformed)) {
                  for (const sinkValue of transformed) {
                     await put(chan, sinkValue);
                  }
               } else if (isAsyncIterable<M>(transformed)) {
                  for await (const sinkValue of transformed) {
                     await put(chan, sinkValue);
                  }
               } else {
                  await put(chan, transformed);
               }
            }
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

   loadToChan<T>(
      iterable: Iterable<T> | AsyncIterable<T>, chan: Chan<T, any>,
      concurrency: number = 1, delay: number = 0): SubscriptionLike
   {
      let globalDone: boolean = false;
      const iterator = (isIterable(iterable)) ? iterable[Symbol.iterator]() : iterable[Symbol.asyncIterator]();

      async function queueFromIterator(localIterResult: IteratorResult<T> | Promise<IteratorResult<T>>): Promise<IteratorResult<T> | false>
      {
         let thisResult: IteratorResult<T> = await localIterResult;
         let nextResult: IteratorResult<T> | false = false;

         if (thisResult.done) {
            globalDone = true;
         } else {
            await put(chan, thisResult.value);

            if (delay > 0) {
               const last = Date.now();
               await sleep(delay);
               console.log(delay, last, 0, Date.now());
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
      iterable: Iterable<T> | AsyncIterable<T>, sink: AsyncSink<T>,
      concurrency: number = 1, delay: number = 0): SubscriptionLike
   {
      let globalDone: boolean = false;
      const iterator = (isIterable(iterable)) ? iterable[Symbol.iterator]() : iterable[Symbol.asyncIterator]();

      async function queueFromIterator(looping: MediumSeedBoolean): Promise<MediumSeedBoolean.TRUE|false>
      {
         if (globalDone) { return false; }

         let thisResult = iterator.next();
         if ((looping === MediumSeedBoolean.TRUE) && (delay > 0)) { await sleep(delay); }

         // TODO: If globalDone was set while in a sleep delay, should we drop the
         //       value instead of awaiting and emitting it?
         thisResult = await thisResult;
         if (thisResult.done) {
            globalDone = true;
            return false;
         }

         const last = Date.now();
         sink.write(thisResult.value);
         if (delay > 0) {
            const lapsed = Date.now() - last;
            if (lapsed < delay) {
               await sleep(delay - lapsed);
            }
            console.log(delay, last, lapsed, Date.now());
         }

         return globalDone ? false : MediumSeedBoolean.TRUE;
      }

      for (let ii = 0; ii < concurrency; ii++) {
         const workerId = ii;
         if (!globalDone) {
            repeat<MediumSeedBoolean>(
               queueFromIterator,
               MediumSeedBoolean.FALSE as MediumSeedBoolean)
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

   public unwind<T>(
      master: AsyncSink<Iterable<T>>,
      sink: Chan<T, any>,
      done?: Chan<Iterable<T>, any>,
      delay: number = 0): SubscriptionLike
   {
      const sources: AsyncSink<IterPair<T>> = this.createAsyncSink<IterPair<T>>();
      let closed: boolean = false;
      const retVal = {
         unsubscribe: () => {
            sources.end();
            closed = true;
         },

         get closed(): boolean { return closed; }
      };

      go(async function () {
         let nextIterable: Iterable<T>;
         for await (nextIterable of master) {
            if (closed) {
               console.log('Master iterables source still open on unsubscribe');
               return;
            }
            sources.write({
               iterator: nextIterable[Symbol.iterator](),
               iterable: nextIterable
            });
         }
         console.log('Master iterables source closed');
         retVal.unsubscribe();
      }).then(function() {
         console.log('Done reading from master iterables');
      }).catch(function(err: any) {
         console.error(err);
         retVal.unsubscribe();
      });

      go(async () => {
         let nextIterPair: IterPair<T>;
         for await (nextIterPair of sources) {
            const nextIterResult: IteratorResult<T> =
               nextIterPair.iterator.next();
            if (!nextIterResult.done) {
               await put(sink, nextIterResult.value);

               const last = Date.now();
               sources.write(nextIterPair);
               if (delay > 0) {
                  const lapsed = Date.now() - last;
                  if (lapsed < delay) {
                     await sleep(delay - lapsed);
                  }
                  console.log(delay, last, lapsed, Date.now());
               }
            } else if (!!done) {
               await put(done, nextIterPair.iterable);
            }
         }
      }).then(console.log)
         .catch(console.error);

      return retVal;
   }

   public service<I>(source: Chan<any, I>, sink: Chan<I, any>, concurrency: number = 1): void
   {
      for (let ii = 0; ii < concurrency; ii++) {
         repeatTake(source, async (value: I) => {
            await put(sink, value);
         });
      }
   }

   public serviceMany<I>(source: Chan<any, I[]>, sink: Chan<I, any>, concurrency: number = 1): void
   {
      for (let ii = 0; ii < concurrency; ii++) {
         repeatTake(source, async (value: I[]) => {
            for (let innerValue of value) {
               await put(sink, innerValue);
            }
         });
      }
   }

   public createMonitor<Msg>( source: Chan<any, Msg> ): IChanMonitor<Msg> {
      const retVal =
         new ChanMonitor(source, new Map<Msg, PromiseHandlers<Msg>>());
      retVal.start();

      return retVal;
   }
}

// export function createQueueFactory<T = any>(_context: interfaces.Context): ConcreteFactory<Queue<T>,
// [PropertyKey?]> { return (key?: PropertyKey): Queue<T> => { let retVal: Queue<T>;  if (!!key) { if
// (_context.container.isBoundNamed(CO_TYPES.Queue, key)) { retVal =
// _context.container.getNamed(CO_TYPES.Queue, key); } else { retVal = new Queue<T>();
// _context.container.bind(CO_TYPES.Queue).toConstantValue(retVal).whenTargetNamed(key); } } else { retVal
// = new Queue<T>(); }  return retVal; } }  export const queueFactoryCreator:
// interfaces.FactoryCreator<Queue<any>> = createQueueFactory;
