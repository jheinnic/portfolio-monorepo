declare module 'co'
{
   import 'co';
   import {OverwriteReturn} from 'simplytyped';

   export interface CoRoutineGenerator<R extends any = any> {
      (): IterableIterator<R>
   }

   export interface WrappableCoRoutineGenerator<R extends any = any, P extends any[] = any[]> {
      (...args: P): IterableIterator<R>
   }

   export type ParamsTuple<F extends Function> =
      F extends (...args: infer P) => any ? P : never;

   export type WrappedCoRoutine<F extends WrappableCoRoutineGenerator<Promise<R>>, R> =
      (...args: ParamsTuple<F>) => Promise<R>;
      // F extends (...args: infer P) => IterableIterator<any>
      //    ? (...args: P) => Promise<R>
      //    : never
      // OverwriteReturn<F, Promise<R>>

   interface CoWrappingFunction<R, F extends WrappableCoRoutineGenerator<Promise<R>>>
   {
      (coRoutine: F): WrappedCoRoutine<F, R>
   }

   export interface Co<R> {
      (gen: CoRoutineGenerator): Promise<R>

      wrap<F extends WrappableCoRoutineGenerator<Promise<R>>, R>(gen: F): WrappedCoRoutine<F, R>
   }

   export const co: Co<any>
}