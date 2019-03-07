import { IsHexadecimal, IsOptional, MaxLength, MinLength } from 'class-validator';

import { configClass, configProp } from '@jchptf/config';

@configClass('eth.lotto.ticketMinting.entropy.devFake')
export class DevFakeOptions
{
   @configProp('hexSeedBits', 'eaa0618c02f97da3')
   @IsOptional()
   @MinLength(16)
   @MaxLength(65536)
   @IsHexadecimal()
   hexSeedBits: string = 'a1d4b3c2';
}