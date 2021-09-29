import * as api from '@jchptf/api';
import {hasIWatch} from "@jchptf/api";

@api.iWatch
export class WatchedThing {
   constructor(public readonly flags: number[]) { }
}

export const foo: WatchedThing = new WatchedThing([1, 4, 4]);
export const bar: WatchedThing = new WatchedThing([2, 2, 7]);

export function zib(id: string, old: WatchedThing, inew: WatchedThing): void {
   console.log('callback for ', id, old, inew);
}

if (hasIWatch<WatchedThing>(foo)) {
   console.log(foo.addWatch('zib', zib));
   foo.notifyWatches(foo, bar);
   console.log(foo.removeWatch('zib'));
}
