// Tuple operations Cons, Head, Tail

type Head<T> = T extends [infer U, ...unknown[]] ? U : never;

type Tail<T> = T extends any[]
   ? ((...args: T) => never) extends ((a: any, ...args: infer R) => never)
      ? R
      : never
   : never;

type Cons<T extends any[], H> =
   ((h: H, ...t: T) => any) extends ((...x: infer X) => any) ? X : never;

// Generic lazy tuple reduction

interface IReduction<Base, In> {
   0: Base;
   1: In;
}

type Reduce<T extends any[], R extends IReduction<any, any>> = R[[T] extends [[]] ? 0 : 1];

// Tuple reversal

interface IReverseRec<H extends any[], T extends any[]>
   extends IReduction<H, Reduce<Tail<T>, IReverseRec<Cons<H, Head<T>>, Tail<T>>>> {}

type Reverse<T> = [T] extends [any[]] ? Reduce<T, IReverseRec<[], T>> : never;

// Currying, finally

interface ICurryRec<H, T extends any[]>
   extends IReduction<H, Reduce<Tail<T>, ICurryRec<(...args: [Head<T>]) => H, Tail<T>>>> {}

export type Curry<F extends (...args: any[]) => any> = Reverse<Parameters<F>> extends infer R
   ? R extends any[]
      ? Reduce<R, ICurryRec<ReturnType<F>, R>>
      : never
   : never;

declare function curry<F extends (...args: any[]) => any>(f: F): Curry<F>;
declare const f: (a: number, b: string, c: symbol, d: boolean, e: void) => boolean;

// (args_0: number) => (args_0: string) => (args_0: symbol) =>
//   (args_0: boolean) => (args_0: void) => boolean
export const curried = curry(f);
