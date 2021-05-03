import { mixin } from '@jchptf/mixins';
import { KeysStronglyExtending } from '@jchptf/objecttypes';

/* eslint-disable no-use-before-define */
export function iterableOn<T extends Record<any, Iterable<P>> & Iterable<P>,
   K extends KeysStronglyExtending<T, Iterable<P>>,
   P extends any = any>(prop: K): ClassDecorator {
   return mixin<Iterable<P>>({
      *[Symbol.iterator](this: T): IterableIterator<P> {
         yield* this[prop];
      },
   });
}
/* eslint-enable no-use-before-define */
