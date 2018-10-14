import {inject, injectable, tagged} from 'inversify';
import {IBagOf} from '@jchptf/api';
import {ILibrary} from '../interfaces/library.interface';
import {FIXTURE_TYPES} from '../di';
import {DI_COMMON_TAGS} from '../../../src/types';
import {IWidget} from '../interfaces/widget.interface';

export const APP_DI_TYPES: IBagOf<symbol> = {
   libOne: Symbol.for('libOne'),
   libTwo: Symbol.for('libTwo'),
   widgetOne: Symbol.for('widgetOne')
};

@injectable()
export class WidgetSharesLibOneApp {
   constructor(
      @tagged(DI_COMMON_TAGS.CuratorOf, APP_DI_TYPES.libOne) @inject(FIXTURE_TYPES.Library) private readonly libOne: ILibrary,
      @tagged(DI_COMMON_TAGS.CuratorOf, APP_DI_TYPES.libTwo) @inject(FIXTURE_TYPES.Library) private readonly libTwo: ILibrary,
      @tagged(DI_COMMON_TAGS.VariantFor, FIXTURE_TYPES.Application) @inject(FIXTURE_TYPES.Widget) private readonly widgetOne: IWidget
   ) {
   }

   doStuff(): number {
      this.libOne.addOne();
      this.libOne.addOne();
      this.libTwo.addOne();

      const retVal = this.widgetOne.getValue() * this.libTwo.getValue() - this.libOne.getValue();
      console.log(retVal);
      return retVal;
   }
}