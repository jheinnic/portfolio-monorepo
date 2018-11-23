import {IEnable, iEnable} from '../../src';

@iEnable()
export class ToggleThing implements IEnable {
   constructor(public readonly flags: number[]) { }

   // public readonly isEnabled: boolean = false;
   public isEnabled(): boolean { return false; }

   public disable(): void { }

   public enable(): void { }

   public toggle(): boolean { return false; }
}