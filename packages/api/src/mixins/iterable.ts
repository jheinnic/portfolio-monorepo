import { mixin } from "../mixin";

type IterableOf<I extends Iterable<any>> = I extends Iterable<infer P> ? P : never;

type IterableImpl<T, K extends keyof T> =
   T[K] extends Iterable<infer P>
      ? Iterable<P> & { [Key in K]: Iterable<P> }
      : never;

export function iterable<T extends IterableImpl<T, K>, K extends keyof T>(prop: K) {
    return mixin<Iterable<IterableOf<T[K]>>>({
       [Symbol.iterator]: function* (this: T): IterableIterator<IterableOf<T[K]>> {
          yield* this[prop] as Iterable<IterableOf<T[K]>>;
       }
    });
}
