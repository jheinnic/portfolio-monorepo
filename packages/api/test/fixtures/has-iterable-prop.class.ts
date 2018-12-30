import {unsupported} from '@thi.ng/errors';

export class HasIterableProp implements Iterable<string>
{
   [Symbol.iterator](): IterableIterator<string> {
      throw unsupported("mixin not fired?");
   }

   public getIterable: Iterable<string>

   constructor() {
      this.getIterable = ['abc', 'def', 'xyz'];
   }
}