import {inject, injectable, tagged} from 'inversify';

import {IBagOf} from '@jchptf/api';
import {ILibrary, IWidget} from '../interfaces';
import {DI_COMMON_TAGS} from '../../../src/di';
import {FIXTURE_TYPES} from '../di';

type AppTypes = 'libOne' | 'libTwo' | 'libThree' | 'widgetOne';

export const APP_DI_TYPES: IBagOf<symbol, AppTypes> = {
   libOne: Symbol.for('libOne'),
   libTwo: Symbol.for('libTwo'),
   libThree: Symbol.for('libThree'),
   widgetOne: Symbol.for('widgetOne')
};

@injectable()
export class WidgetSharesLibOneApp {
   constructor(
      @tagged(DI_COMMON_TAGS.CuratorOf, APP_DI_TYPES.libOne) @inject(FIXTURE_TYPES.Library) private readonly libOne: ILibrary,
      @tagged(DI_COMMON_TAGS.CuratorOf, APP_DI_TYPES.libTwo) @inject(FIXTURE_TYPES.Library) private readonly libTwo: ILibrary,
      @tagged(DI_COMMON_TAGS.CuratorOf, FIXTURE_TYPES.Application) @inject(FIXTURE_TYPES.Widget) private readonly widgetOne: IWidget
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