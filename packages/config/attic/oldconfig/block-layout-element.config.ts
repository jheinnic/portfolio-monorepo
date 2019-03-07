import { IsInt, IsPositive, Max, Min } from 'class-validator';

import { configClass, configProp } from '@jchptf/config';

@configClass('eth.lotto.prizeMinting.blockLayout.serial')
export class BlockLayoutElement
{
   @configProp('fieldSize')
   @IsPositive()
   @IsInt()
   public readonly fieldSize: number = 0;

   @configProp('fieldOffset')
   @IsInt()
   @Min(0)
   @Max(512)
   public readonly fieldOffset: number = 0;
}