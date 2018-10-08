import {IEnable} from '.';
import {IEnable as enable} from './mixins';

@enable
export class ToggleThing implements IEnable<any> {
   constructor(public readonly flags: number[]) { }

   public disable(opts?: any)
   {
      opts;
   }

   public enable(opts?: any)
   {
      opts;
   }

   public isEnabled(): boolean
   {
      return false;
   }

   public toggle(): boolean
   {
      return false;
   }
}

export const foo: ToggleThing = new ToggleThing([1, 4, 4]);

console.log(foo.isEnabled());
foo.toggle();
console.log(foo.isEnabled());
