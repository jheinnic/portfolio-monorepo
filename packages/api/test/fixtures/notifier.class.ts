import {IEvent, INotify, iNotify, Listener} from '../../src';

@iNotify
export class Notifier implements INotify
{
   constructor(public readonly flags: number[]) {
   }

   public addListener(_e1: string, _listen: ((e: IEvent) => void) | Listener, _scope?: any): boolean
   {
      throw new Error('Unimplemented Mixin');
   }

   public notify(_e: IEvent): void
   {
      throw new Error('Unimplemented Mixin');
   }

   public removeListener(_e1: string, _listen: ((e: IEvent) => void) | Listener, _scope?: any): boolean
   {
      throw new Error('Unimplemented Mixin');
   }

}
