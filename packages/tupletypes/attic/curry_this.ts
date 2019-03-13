type Init<T extends any[], TTail extends any[] = TailArray<T>> = CastArray<{
   [K in keyof TTail]: T[keyof T & K];
}>;

type PotentialArgs<T extends any[], TResult extends any[] = T> = {
   'continue': PotentialArgs<Init<T>, TResult | Init<T>>;
   'end': TResult;
}[T extends [] ? 'end' : 'continue'];

type Args<T extends Function> =
   T extends (...args: infer TArgs) => any ? TArgs
      : never;

type TailArgs<F extends Function> =
   F extends (head: any, ...tail: infer TTail) => any ? TTail :
      never;

type TailArray<A extends any[]> = TailArgs<(...args: A) => any>;

type CastArray<T> = T extends any[] ? T : [];

type DropFromArraySize<TSource extends any[], TSize extends any[]> = CastArray<{
   'continue': DropFromArraySize<TailArray<TSource>, TailArray<TSize>>,
   'end': TSource,
}[TSize extends [] ? 'end' : 'continue']>;

type PartialArgs<T extends Function> =
   T extends (...args: infer TArgs) => any ? Partial<TArgs>
      : never;

type Curried<T extends (...args: any) => any> =
   <
      TInitArgs extends PotentialArgs<Args<T>>,
      TTailArgs extends DropFromArraySize<Args<T>, TInitArgs>
      >(...args: TInitArgs) =>
      TTailArgs extends []
         ? ReturnType<T>
         : Curried<(...args: TTailArgs) => ReturnType<T>>;

type Curry = <TFunc extends (...args: any) => any>(func: TFunc) => Curried<TFunc>;

declare const curry: Curry;

const curried = curry((a: 1 | undefined, b: number | number[], c: string) => 1);

// works :D
const a = curried(1)([2])('x');
const b = curried(1)(2, 'x');
const c = curried(1, 2)('x');
const d = curried(1, 2, 'x');
const e = curried(undefined)(2)('2');

// notify error
curried(undefined)(2)(undefined);
