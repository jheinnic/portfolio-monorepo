import {injectable} from 'inversify';
import {co, CoRoutineGenerator, WrappableCoRoutineGenerator, WrappedCoRoutineGenerator} from 'co';
import chan from 'chan';
import Queue from 'co-priority-queue';
import {IConcurrentWorkFactory, Limiter} from '../interfaces';
import {asGenerator, SinkLike} from '../interfaces/sink-like.type';

@injectable()
export class ConcurrentWorkFactory implements IConcurrentWorkFactory
{
   createPriorityQueue<M>(): Queue<M>
   {
      return new Queue<M>();
   }

   createChan<M>(): Chan.Chan<M>
   {
      return chan<M>();
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

   createStageHandler<T, M = T>(
      source: Chan.Chan<T>, transform: WrappableCoRoutineGenerator<M, [T]>, concurrency: number,
      sink: SinkLike<M>): void
   {
      let applyTransform: WrappedCoRoutineGenerator<typeof transform, M, [T]> =
         co.wrap<typeof transform, M, [T]>(transform);
      let toSink = asGenerator<M>(sink);
      let sendToChan = co.wrap(
         function* (value: T): IterableIterator<any> {
            const transformedValue: M = yield applyTransform(value);
            yield toSink(transformedValue);
         }
      );

      for (let ii = 0; ii < concurrency; ii++) {
         const workerId = ii;
         co(function* (): IterableIterator<any> {
            while (true) {
               const input = yield source;
               yield sendToChan(input);
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
}


// export function createQueueFactory<T = any>(_context: interfaces.Context): ConcreteFactory<Queue<T>,
// [PropertyKey?]> { return (key?: PropertyKey): Queue<T> => { let retVal: Queue<T>;  if (!!key) { if
// (_context.container.isBoundNamed(CO_TYPES.Queue, key)) { retVal =
// _context.container.getNamed(CO_TYPES.Queue, key); } else { retVal = new Queue<T>();
// _context.container.bind(CO_TYPES.Queue).toConstantValue(retVal).whenTargetNamed(key); } } else { retVal
// = new Queue<T>(); }  return retVal; } }  export const queueFactoryCreator:
// interfaces.FactoryCreator<Queue<any>> = createQueueFactory;