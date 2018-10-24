import {co, CoRoutineGenerator, WrappableCoRoutineGenerator, WrappedCoRoutineGenerator} from 'co';
import {inject, injectable} from 'inversify';
import {IConcurrentTaskPoolFactory, IQueueFactory, Limiter} from '../interfaces';
import {CO_TYPES} from '../di';
import {Queue} from 'co-priority-queue';

@injectable()
export class ConcurrentTaskPoolFactory implements IConcurrentTaskPoolFactory
{
   constructor(
      @inject(CO_TYPES.QueueFactory) private readonly queueFactory: IQueueFactory
   )
   { }

   getTaskLimiter(concurrency: number, defaultPriority: number = 10): Limiter
   {
      const queue: Queue<CoRoutineGenerator> =
         this.queueFactory.createQueue<CoRoutineGenerator>();

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

   public getLimitedTask<
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
         this.queueFactory.createQueue<QueueMsg>();
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
