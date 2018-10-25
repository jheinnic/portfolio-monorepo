import {injectable} from 'inversify';
import {Queue} from 'co-priority-queue';
import {co, CoRoutineGenerator, WrappableCoRoutineGenerator, WrappedCoRoutineGenerator} from 'co';

import {IConcurrentWorkFactory, Limiter} from '../interfaces';

@injectable()
export class ConcurrentWorkFactory implements IConcurrentWorkFactory
{
   createPriorityQueue<M>(): Queue<M> {
      return new Queue<M>();
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
         R extends any = any, P extends any[] = any[]>(
         generator: F, priority: number = defaultPriority): WrappedCoRoutineGenerator<F, R, P> {
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

   // public altGetLimitedTask<F extends WrappableCoRoutineGenerator<R, P> = WrappableCoRoutineGenerator<R,
   // P>, R = any, P extends any[] = any[]>( coWrappable: F, concurrency: number):
   // WrappedCoRoutineGenerator<F, R, P> { return this.getTaskLimiter(concurrency, 10)(coWrappable); }

   public createLimitedTask<
      F extends WrappableCoRoutineGenerator<R, P> = WrappableCoRoutineGenerator<R, P>,
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
         }).catch(function (err) {
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
}



// export function createQueueFactory<T = any>(_context: interfaces.Context): ConcreteFactory<Queue<T>, [PropertyKey?]> {
//    return (key?: PropertyKey): Queue<T> => {
//       let retVal: Queue<T>;
//
//       if (!!key) {
//          if (_context.container.isBoundNamed(CO_TYPES.Queue, key)) {
//             retVal = _context.container.getNamed(CO_TYPES.Queue, key);
//          } else {
//             retVal = new Queue<T>();
//             _context.container.bind(CO_TYPES.Queue).toConstantValue(retVal).whenTargetNamed(key);
//          }
//       } else {
//          retVal = new Queue<T>();
//       }
//
//       return retVal;
//    }
// }
//
// export const queueFactoryCreator: interfaces.FactoryCreator<Queue<any>> = createQueueFactory;