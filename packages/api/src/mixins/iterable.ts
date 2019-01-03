import { mixin } from "../mixin";
import {StrictKeysThatAre} from '@jchptf/objecttypes';

export function iterableOn<
   T extends Record<any, Iterable<P>> & Iterable<P>,
   K extends StrictKeysThatAre<T, Iterable<P>>,
   P extends any = any>(prop: K) : ClassDecorator
{
    return mixin<Iterable<P>>({
       [Symbol.iterator]: function* (this: T): IterableIterator<P> {
          yield* this[prop];
       }
    });
}
