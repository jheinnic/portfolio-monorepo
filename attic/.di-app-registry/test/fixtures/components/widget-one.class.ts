import {inject, injectable, tagged} from 'inversify';

import {DI_COMMON_TAGS} from '../../../src/di';
import {IWidget} from '../interfaces/widget.interface';
import {ILibrary} from '../interfaces/library.interface';
import {FIXTURE_TYPES} from '../di/types';
import {IBagOf} from '@jchptf/api';

export const WIDGET_ONE_TAG_VALUES: IBagOf<symbol, 'libDepOne' | 'libDepTwo'> = {
   libDepOne: Symbol.for('libDepOne'),
   libDepTwo: Symbol.for('libDepTwo')
};

@injectable()
export class WidgetOne implements IWidget
{
   constructor(
      @inject(FIXTURE_TYPES.Library) @tagged(DI_COMMON_TAGS.VariantFor, WIDGET_ONE_TAG_VALUES.libDepOne) private readonly libOne: ILibrary,
      @inject(FIXTURE_TYPES.Library) @tagged(DI_COMMON_TAGS.VariantFor, WIDGET_ONE_TAG_VALUES.libDepTwo) private readonly libTwo: ILibrary
   ) { }

   public getValue(): number
   {
      const retVal = this.libOne.getValue() + this.libTwo.getValue();
      console.log('Widget One Says ' + retVal);
      return retVal;
   }

}