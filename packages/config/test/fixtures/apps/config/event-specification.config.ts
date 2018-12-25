import {IsInt, IsPositive, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

import {configClass, configProp} from '../../../../src/decorators';
import {PrizePool} from './prize-pool.config';
import '@jchptf/reflection';
import {EVENT_SPECIFICATION} from '../di/types';

@configClass("eth.lotto.eventSpec", EVENT_SPECIFICATION) // "eth.lotto.eventSpec")
export class EventSpecification {
   @configProp("sponsorId")
   @IsPositive()
   @IsInt()
   public readonly sponsorId: number = 0;

   @configProp("gameId")
   @IsPositive()
   @IsInt()
   public readonly gameId: number = 0;

   @configProp("prizePool")
   @ValidateNested()
   @Type(() => PrizePool)
   public readonly prizeTiers: PrizePool = new PrizePool();
}