import * as assert from 'assert';
import {Notifier} from './fixtures';

import {Event, EVENT_ALL, INotify, iNotify} from '../src';

describe('iNotify', () => {

   it('works', () => {

      @iNotify()
      class Foo implements INotify
      {
         addListener(_: string, __: (e: Event) => void, ___?: any): boolean
         {
            throw new Error();
         }

         removeListener(_: string, __: (e: Event) => void, ___?: any): boolean
         {
            throw new Error();
         }

         notify(_: Event)
         {
            throw new Error();
         }
      }

      const res: any = {};
      const foo = new Foo();
      const l = (e: any) => res[e.id] = e.value;
      const lall = (e: any) => res[EVENT_ALL] = e.value;
      assert.doesNotThrow(() => foo.addListener('x', l));
      assert.doesNotThrow(() => foo.addListener(EVENT_ALL, lall));
      foo.notify({
         id: 'x',
         value: 1
      });
      assert.deepEqual(
         res, {
            x: 1,
            [EVENT_ALL]: 1
         });
      assert.doesNotThrow(() => foo.removeListener('x', l));
      foo.notify({
         id: 'x',
         value: 2
      });
      assert.deepEqual(
         res, {
            x: 1,
            [EVENT_ALL]: 2
         });
      assert.doesNotThrow(() => foo.removeListener(EVENT_ALL, lall));
      foo.notify({
         id: 'x',
         value: 3
      });
      assert.deepEqual(
         res, {
            x: 1,
            [EVENT_ALL]: 2
         });
   });

   let foo: Notifier;
   let e: Event;

   beforeEach(() => {
      foo = new Notifier([1, 4, 4]);
      e = {id: 'e'};
   });

   function listen(e: Event)
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

