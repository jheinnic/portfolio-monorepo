import {IsHexadecimal, IsOptional, MaxLength, MinLength} from 'class-validator';

import {configClass, configProp} from '../../../../src/decorators';
import '@jchptf/reflection';

@configClass('eth.lotto.deployment.entropy.devFake')
export class DevFakeOptions {
   @configProp('hexSeedBits')
   @IsOptional()
   @MinLength(16)
   @MaxLength(65536)
   @IsHexadecimal()
   hexSeedBits: string = 'a1d4b3c2';
}