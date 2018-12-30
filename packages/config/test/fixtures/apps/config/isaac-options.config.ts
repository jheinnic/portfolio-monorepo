import {IsPositive} from 'class-validator';

import {configClass, configProp} from '../../../../src/decorators';

@configClass()
export class IsaacOptions
{
   @configProp('seedBits')
   @IsPositive()
   public readonly seedBits: number = 0;
}
