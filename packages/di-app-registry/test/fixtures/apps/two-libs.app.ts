import {inject, injectable, named} from 'inversify';
import {IBagOf} from '@jchptf/api';
import {ILibrary} from '../interfaces/library.interface';
import {FIXTURE_TYPES} from '../di/types';

export const APP_DI_TYPES: IBagOf<symbol> = {
   libOne: Symbol.for('libOne'),
   libTwo: Symbol.for('libTwo')
};

@injectable()
export class TwoLibsApp {
   constructor(
      @named(APP_DI_TYPES.libOne) @inject(FIXTURE_TYPES.Library) private readonly libOne: ILibrary,
      @named(APP_DI_TYPES.libTwo) @inject(FIXTURE_TYPES.Library) private readonly libTwo: ILibrary
   ) {
   }

   doStuff(): number {
      this.libOne.addOne();
      this.libOne.addOne();
      this.libTwo.addOne();

      const retVal = this.libOne.getValue() * this.libTwo.getValue();
      console.log(retVal);
      return retVal;
   }
}