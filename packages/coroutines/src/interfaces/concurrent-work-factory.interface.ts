import {WrappableCoRoutineGenerator, WrappedCoRoutineGenerator} from 'co';
import Queue from 'co-priority-queue';

export interface IConcurrentWorkFactory {
   /**
    * Use Priority Queues to deliver messages to co-routines that suspend themselves on a yield when there
    * is no work available.  Priority queue use cases have fire-and-forget semantics.  If you instead need
    * call-and-response semantics, then you probably want use co, co.wrap, or LimiterFactory.  The latter
    * is appropriate if you want the experience of being suspended on the queue for access to a limited
    * resource with intentionally constrained concurrent access supported.
    *
    * Priority queues deliver incoming messages in the same order they were received, subject to the
    * priority ranking specified by each caller contributing a message.
    *
    * @see co
    * @see co.wrap
    */
   createPriorityQueue<T extends any = any>(): Queue<T>;

   createChan<T extends any = any>(): Chan.Chan<T>

   /**
    * Given a wrappable co-routine generator that accepts some number of arguments,
    * and a target for max concurrency, return a function that accepts the same input
    * arguments, and returns a promise for the result eventually returned by calling the
    * wrappable co-routine generator with those arguments.  Tasks created by calling
    * the returned function are evaluated concurrently up to the specified maximum
    * concurrent degree, then overflow to a backlog queue for subsequent execution as
    * and when resources become available.
    *
    * This method differs from its sibling, {@see getTaskLimiter()}, insofar as it
    * does not provide a facility for making multiple calls at different priorities,
    * not does it support using sharing the requested measure of concurrency across
    * tasks of different types--only one wrappable co-routine generator is available
    * through the returns function, and the input from each distinct call is used to
    * create queue concurrent work at the same priority.
    *
    * @param coWrappable
    * @param concurrency
    * @see co
    * @see co.wrap
    */
   createLimitedTask
      <F extends WrappableCoRoutineGenerator<R, P> = WrappableCoRoutineGenerator<R, P>,
      R = any, P extends any[] = any[]>(coWrappable: F, concurrency: number): WrappedCoRoutineGenerator<F, R, P>

   /**
    * Given a target concurrency factor, return a function that accepts wrappable
    * coroutine generators and a priority level.  Each call to this outermost returned
    * function yields a function that behaves as that returned by {@see getTaskLimiter()},
    * but sharing the concurrency provided on the call to this method, and with each
    * second-degree wrapper using the specified priority when submitting its work.
    *
    * If no priority is provided when using the first returned function, a default
    * priority value provided as a second optional argument to this method, or a fixed
    * default of 10 if this method is only called with concurrency is used instead.
    *
    * @param concurrency The greatest number of concurrent jobs that will concurrently
    * be in progress from across all service gateway functions generated through this
    * function's returned factory function.
    * @param defaultPriority An optional default priority that overrides the global
    * default of 10 when the returned function is called without specifying a priority
    * for its returned service gateway function.
    * @see co
    * @see co.wrap
    */
   createLimiter
      <F extends WrappableCoRoutineGenerator<R, P> = WrappableCoRoutineGenerator<R, P>,
         R = any, P extends any[] = any[]>(concurrency: number, defaultPriority?: number):
      (coWrappable: F, priority: number) => WrappedCoRoutineGenerator<F, R, P>

   createSourceLoader<T>(iterator: IterableIterator<T>, concurrency: number, backlog: number): Chan.Chan<T>
}