import {ILibrary} from '../interfaces/library.interface';
import {inject, injectable} from 'inversify';
import {FIXTURE_TYPES} from '../di/types';

@injectable()
export class Library implements ILibrary{
   private value: number;

   constructor(@inject(FIXTURE_TYPES.InitialValue) initial: number) {
      this.value = initial;
   }

   public addOne(): void
   {
      this.value++;
   }

   public getValue(): number
   {
      return this.value;
   }
}