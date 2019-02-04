import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { configClass, configProp } from '../../../../src/decorators';
import { DevFakeOptions } from './dev-fake-options.config';
import { HmacDrbgOptions } from './hmac-drbg-options.config';
import { IsaacOptions } from './isaac-options.config';

@configClass('eth.lotto.prizeMinting.entropyDefaults')
export class EntropyAlgorithms
{
   @configProp('devFake')
   @IsOptional()
   @Type(() => DevFakeOptions)
   devFake: DevFakeOptions = new DevFakeOptions();


   @configProp('hmacDrbg')
   @IsOptional()
   @ValidateNested()
   @Type(() => HmacDrbgOptions)
   hmacDrbg: HmacDrbgOptions = new HmacDrbgOptions();

   @configProp('isaac')
   @IsOptional()
   @ValidateNested()
   @Type(() => IsaacOptions)
   isaac: IsaacOptions = new IsaacOptions();

   // @configProp('nodeCrypto')
   // @IsOptional()
   // @ValidateNested()
   // @Type(() => NodeCryptoOptions)
   // nodeCrypto: NodeCryptoOptions = new NodeCryptoOptions();
   //
   // @configProp('randomOrg')
   // @IsOptional()
   // @ValidateNested()
   // @Type(() => RandomOrgOptions)
   // randomOrg: RandomOrgOptions = new RandomOrgOptions();
}