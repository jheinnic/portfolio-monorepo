const INVARIANT_MARKER = Symbol();
type Invariant<T> = {
   [INVARIANT_MARKER](t: T): T;
};

interface ITypeFuncs<_X> {}

const FUN_MARKER = Symbol();
type Fun<K extends keyof ITypeFuncs<{}>> = Invariant<[typeof FUN_MARKER, K]>;

const BAD_APP_MARKER = Symbol();
type BadApp<F, X> = Invariant<[typeof BAD_APP_MARKER, F, X]>;
type App<K extends keyof ITypeFuncs<{}>, X> = ITypeFuncs<X>[K];
// [F] extends [Fun<infer K>] ?: BadApp<F, X>;

const BAD_MAP_TUPLE = Symbol();
type MapTuple<F extends keyof ITypeFuncs<{}>, T> =
   [T] extends never[] ? never[] :
      [T] extends [[infer T1]] ? [App<F, T1>] :
         [T] extends [[infer T1, infer T2]] ? [App<F, T1>, App<F, T2>] :
            [T] extends [[infer T1, infer T2, infer T3]]
               ? [App<F, T1>, App<F, T2>, App<F, T3>]
               : [T] extends [[infer T1, infer T2, infer T3, infer T4]]
               ? [App<F, T1>, App<F, T2>, App<F, T3>, App<F, T4>]
               : [T] extends [[infer T1, infer T2, infer T3, infer T4, infer T5]]
                  ? [App<F, T1>, App<F, T2>, App<F, T3>, App<F, T4>, App<F, T5>]
                  : [T] extends [[infer T1, infer T2, infer T3, infer T4, infer T5, infer T6]]
                     ? [App<F, T1>, App<F, T2>, App<F, T3>, App<F, T4>, App<F, T5>, App<F, T6>]
                     : [T] extends [
                           [
                              infer T1, infer T2, infer T3, infer T4,
                              infer T5, infer T6, infer T7
                              ]
                           ]
                        ? [
                           App<F, T1>, App<F, T2>, App<F, T3>, App<F, T4>,
                           App<F, T5>, App<F, T6>, App<F, T7>
                           ]
                        : [T] extends [
                              [
                                 infer T1, infer T2, infer T3, infer T4,
                                 infer T5, infer T6, infer T7, infer T8
                                 ]
                              ]
                           ? [
                              App<F, T1>, App<F, T2>, App<F, T3>, App<F, T4>,
                              App<F, T5>, App<F, T6>, App<F, T7>, App<F, T8>
                              ]
                           : Invariant<[typeof BAD_MAP_TUPLE, F, T]>;

// type PromiseTuple<T extends any[]> = [Promise<E> for E in T];
export const fPromise: unique symbol = Symbol();

interface ITypeFuncs<_X>
{
   [fPromise]: Promise<_X>;
   aaa: number;
}

// type F_Promise = Fun<typeof fPromise>;
type PromiseTuple<T> = MapTuple<typeof fPromise, T>;

type T1 = PromiseTuple<[number, string, boolean]>;

type AltPromiseTuple<T> = {
   [K in keyof T]: Promise<T[K]>;
};

type T2 = AltPromiseTuple<[number, string, boolean]>;
let t1: T1 = [Promise.resolve(5), Promise.resolve('ddd'), Promise.resolve(true)];
let t2: T2 = [Promise.resolve(5), Promise.resolve('ddd'), Promise.resolve(true)];

t2 = t1;
t1 = t2;

type Ff = typeof fPromise;

class Tester
{
   constructor(arg: ITypeFuncs<string>[Ff])
   {
      async function foo(): Promise<number>
      {
         console.log(await arg);
         return arg2;
      }

      foo()
         .then(console.log)
         .catch(console.error);
   }

   protected aaa: number = 5;

   public foo(arg: this['foo']): number
   {
      return arg(this.foo);
   }
}
