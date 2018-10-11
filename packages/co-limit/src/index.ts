import {co, ParamsTuple, WrappableCoRoutineGenerator, WrappedCoRoutine} from 'co';
const Queue = require('co-priority-queue');

interface Limiter<F extends WrappableCoRoutineGenerator = WrappableCoRoutineGenerator, R = any>{
   (coWrappable: F, priority: number): WrappedCoRoutine<F, R>
}

export function limiter(concurrency: number): Limiter {
   // @ts-ignore
   const queue = new Queue();

   // Create consumers
   for (let ii = 0; ii < concurrency; ii++) {
      co(function *() {
         while (true) {
            const yieldable = yield queue.next();
            yield co(yieldable);
         }
      }).catch(function(err) {
         console.error(err.stack);
      });
   }

   return function limit<R, F extends WrappableCoRoutineGenerator>(generator: F, priority: number): WrappedCoRoutine<F, R> {
      const wrapped: WrappedCoRoutine<F, R> = co.wrap<F, R>(generator);

      return function(...args: ParamsTuple<F>): Promise<R> {
         return new Promise<R>(
            (resolve, reject) => {
               queue.push(function* () {
                  try {
                     resolve(yield wrapped(...args));
                  } catch(err) {
                     reject(err);
                  }
               }, priority);
            }
         );
      }
   };
}
