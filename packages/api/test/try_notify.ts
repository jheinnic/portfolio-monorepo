import {INotify, Event, Listener, mixins} from '../src';

@mixins.INotify
export class ToggleThing implements INotify
{
   constructor(public readonly flags: number[]) {
   }

   public addListener(_e1: string, _listen: ((e: Event) => void) | Listener, _scope?: any): boolean
   {
      throw new Error('Unimplemented Mixin');
   }

   public notify(_e: Event): void
   {
      throw new Error('Unimplemented Mixin');
   }

   public removeListener(_e1: string, _listen: ((e: Event) => void) | Listener, _scope?: any): boolean
   {
      throw new Error('Unimplemented Mixin');
   }

}


export const foo: ToggleThing = new ToggleThing([1, 4, 4]);
export const e: Event = {
   id: 'e'
};

function listen(e: Event) {
   console.log(e);
}

console.log(foo.addListener('e', listen));
foo.notify(e);
console.log(foo.removeListener('e', listen));
foo.notify(e);
console.log(foo.removeListener('e', listen));
