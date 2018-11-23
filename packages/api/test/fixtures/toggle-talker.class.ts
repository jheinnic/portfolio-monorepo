import {IEnable, iEnable, INotify, iNotify, Event, Listener} from '../../src';

@iEnable()
@iNotify()
export class ToggleTalker implements IEnable, INotify {
   constructor(public readonly flags: number[]) { }

   public isEnabled(): boolean { return true; }

   public disable(): void { }

   public enable(): void { }

   public toggle(): boolean { return false; }

   public addListener(_id: string, _fn: Listener, _scope?: any): boolean
   {
      return false;
   }

   public notify(_event: Event): void { }

   public removeListener(_id: string, _fn: Listener, _scope?: any): boolean
   {
      return false;
   }
}