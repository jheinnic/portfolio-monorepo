declare module 'co'
{
   import 'co';

   export interface CoRoutineGenerator<R extends any = any> {
      (): IterableIterator<R>
   }

   export interface WrappableCoRoutineGenerator<R extends any = any, P extends any[] = []> {
      (...args: P): IterableIterator<R>
   }

   export type WrappedCoRoutineGenerator<R extends any = any, P extends any[] = []> =
      (...args: P) => Promise<R>;
   // F extends (...args: infer P) => IterableIterator<any>
   //    ? (...args: P) => Promise<R>
   //    : never
   // OverwriteReturn<F, Promise<R>>

   // Redundant
   // interface CoWrappingFunction<
   //    F extends WrappableCoRoutineGenerator<Promise<R>, P>,
   //    R extends any = any,
   //    P extends any[] = any[]>
   // {
   //    (coRoutine: F): WrappedCoRoutineGenerator<F, R, P>
   // }

   // type CoWrap<F extends ((...args: any[]) => IterableIterator<any>), T> =
   //    ((...args: any[]) => IterableIterator<any>) extends ((...args: infer P) => IterableIterator<any>)
   //       ? (coroutine: ((...args: P) => IterableIterator<any>)) => ((...args: P) => Promise<T>)
   //       : never;

   export interface Co<R extends any = any> {
      // (coroutine: () => IterableIterator<any>): Promise<T>
      (gen: CoRoutineGenerator<R>): Promise<R>

      // wrap: CoWrap<(...args: any[]) => IterableIterator<any>, T>
      wrap<R extends any = any, P extends any[] = any[]>(
         gen: WrappableCoRoutineGenerator<R, P>
      ): WrappedCoRoutineGenerator<R, P>
   }

   export type CoRoutineGeneratorLike<R extends any = any, P extends any[] = []> =
      CoRoutineGenerator<R> | WrappableCoRoutineGenerator<R, P>

   export type CoRoutineReturn<CO extends CoRoutineGeneratorLike<any, any>> =
      ReturnType<CO> extends IterableIterator<infer P> ? P : never;

   export const co: Co;
}