import {IsPositive} from 'class-validator';

import {configClass, configProp} from '../../../../src/decorators';
import '@jchptf/reflection';

@configClass()
export class IsaacOptions
{
   @configProp('seedBits')
   @IsPositive()
   public readonly seedBits: number = 0;
}
