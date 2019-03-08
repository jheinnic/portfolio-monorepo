/// <reference path="../../typings/medium/index.d.ts">
import { Transducer } from 'transducers-js';
import { SubscriptionLike } from 'rxjs';
import { AsyncSink } from 'ix';
import { Chan } from 'medium';

import { AsyncTx } from '@jchptf/txtypes';
import { ChanBufferType } from './chan-buffer-type.enum';
import { Limiter } from './limiter.type';
import { SinkLike } from './sink-like.type';
import { IAdapter } from '@jchptf/api';
import { IChanMonitor } from './chan-monitor.interface';

export interface IConcurrentWorkFactory
{
   /**
    * Use Priority Queues to deliver messages to co-routines that suspend themselves on a yield
    * when there is no work available.  Priority queue use cases have fire-and-forget semantics.
    * Work in excess of available concurrency is queued and flow control immediately returns to
    * caller.  Because
    *
    * If you instead need call-and-response semantics, then you probably want use co, co.wrap, or
    * LimiterFactory.  The latter is appropriate if you want callers blocked on
    * the queue for access to a limited resource with intentionally constrained concurrent access
    * supported.
    *
    * Priority queues deliver incoming messages in the same order they were received, subject to
    * the priority ranking specified by each caller contributing a message.
    *
    * @see co
    * @see co.wrap
    createPriorityQueue<T extends any = any>(): Queue<T>;
    */

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
   // createLimitedTask
   //    <R = any, P extends any[] = any[]>(
   //       coWrappable: WrappableCoRoutineGenerator<R, P> , concurrency: number
   // ): WrappedCoRoutineGenerator<R, P>

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
   createLimiter(concurrency: number, defaultPriority?: number): Limiter;

   createChan<T = any>(bufSize?: number, bufType?: ChanBufferType): IAdapter<Chan<T, T>>;

   createTxChan<T = any, M = T>(
      tx: Transducer<T, M>, bufSize?: number, bufType?: ChanBufferType): IAdapter<Chan<T, M>>;

   createAsyncSink<T = any>(): AsyncSink<T>;

   transformToSink<I, O>(
      source: Chan<any, I>,
      sink: SinkLike<O>,
      transform: AsyncTx<[I], O> | AsyncTx<[I], Iterable<O>>,
      concurrency?: number,
   ): void;

   transformToChan<I, O>(
      source: Chan<any, I>,
      chan: Chan<O, any>,
      transform: AsyncTx<[I], O> | AsyncTx<[I], Iterable<O>>,
      concurrency?: number,
   ): void;

   loadToChan<T>(
      source: Iterable<T> | AsyncIterable<T>,
      chan: Chan<T, any>,
      concurrency?: number,
      delay?: number,
   ): SubscriptionLike;

   loadToSink<T>(
      source: Iterable<T> | AsyncIterable<T>,
      sink: AsyncSink<T>,
      concurrency?: number,
      delay?: number,
   ): SubscriptionLike;

   // cycle<T>(source: Iterable<T>, sink: SinkLike<T>, delay?: number): SubscriptionLike;

   unwind<T>(
      master: AsyncSink<Iterable<T>>,
      sink: Chan<T, any>,
      done?: Chan<Iterable<T>, any>,
      delay?: number,
   ): SubscriptionLike;

   // service<I, O>(source: Chan<any, I>, xducer: Transducer<I, O>, sink: Chan<O, any>,
   // concurrency?: number): void;

   // serviceMany<I, O>(source: Chan<any, I>, xducer: Transducer<I, O[]>, sink: Chan<O, any>,
   // concurrency?: number): void;

   service<I>(
      source: Chan<any, I>,
      sink: Chan<I, any>,
      concurrency?: number,
   ): void;

   serviceMany<I>(
      source: Chan<any, I[]>,
      sink: Chan<I, any>,
      concurrency?: number,
   ): void;

   createMonitor<Msg>( msgSource: Chan<any, Msg> ): IChanMonitor<Msg>;
}
