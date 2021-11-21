import * as assert from 'assert';
import { Notifier } from '../fixtures';

import {IEvent, EVENT_ALL, INotify, iNotify, hasINotify} from '@jchptf/api';

describe('iNotify', () => {

   it('works', () => {

      @iNotify
      class Foo { }

      const res: any = {};
      const foo = new Foo();
      const l = (e: any) => res[e.id] = e.value;
      const lall = (e: any) => res[EVENT_ALL] = e.value;
      if (hasINotify(foo)) {
         assert.doesNotThrow(() => foo.addListener('x', l));
         assert.doesNotThrow(() => foo.addListener(EVENT_ALL, lall));
         foo.notify({
            id: 'x',
            value: 1,
         });
         assert.deepEqual(
             res, {
                x: 1,
                [EVENT_ALL]: 1,
             });
         assert.doesNotThrow(() => foo.removeListener('x', l));
         foo.notify({
            id: 'x',
            value: 2,
         });
         assert.deepEqual(
             res, {
                x: 1,
                [EVENT_ALL]: 2,
             });
         assert.doesNotThrow(() => foo.removeListener(EVENT_ALL, lall));
         foo.notify({
            id: 'x',
            value: 3,
         });
         assert.deepEqual(
             res, {
                x: 1,
                [EVENT_ALL]: 2,
             });
      }
   });

   let foo: INotify
   let e: IEvent

   beforeEach(() => {
      foo = new Notifier([1, 4, 4]) as unknown as INotify;
      e = { id: 'e' };
   });

   function listen(e: IEvent)
   {
      console.log(e);
   }

   it('works2', () => {
      console.log(foo.addListener('e', listen));
      foo.notify(e);
      console.log(foo.removeListener('e', listen));
      foo.notify(e);
      console.log(foo.removeListener('e', listen));
   });
});
