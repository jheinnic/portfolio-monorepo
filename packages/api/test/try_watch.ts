import {mixins} from '../src';
import * as api from '../src';

@mixins.IWatch<WatchedThing>()
export class WatchedThing implements api.IWatch<WatchedThing> {
   constructor(public readonly flags: number[]) { }

   public addWatch(id: string, fn: api.Watch<WatchedThing>): boolean
   {
      fn(id, this, this);
      return false;
   }

   public notifyWatches(oldState: WatchedThing, newState: WatchedThing): void
   {
      console.log(oldState, newState);
   }

   public removeWatch(id: string): boolean
   {
      return id === "id";
   }

}

export const foo: WatchedThing = new WatchedThing([1, 4, 4]);
export const bar: WatchedThing = new WatchedThing([2, 2, 7]);

export function zib(id: string, old: WatchedThing, inew: WatchedThing): void {
   console.log('callback for ', id, old, inew);
}

console.log(foo.addWatch("zib", zib));
foo.notifyWatches(foo, bar);
console.log(foo.removeWatch("zib"));
