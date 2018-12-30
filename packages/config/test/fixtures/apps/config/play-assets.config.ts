import {IsIn} from 'class-validator';

import {configClass, configProp} from '../../../../src/decorators';

@configClass('eth.lotto.playAssets')
export class PlayAssets
{
   @configProp('ticketStyle')
   @IsIn(['randomArt'])
   public readonly ticketStyle: 'randomArt' = 'randomArt';
}
