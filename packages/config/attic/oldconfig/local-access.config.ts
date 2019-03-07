import { IsOptional } from 'class-validator';

import { configClass, configProp } from '@jchptf/config';

@configClass('eth.lotto.deployment.localAccess')
export class LocalAccess
{
   @configProp('rootPath')
   @IsOptional()
   rootPath: string = '';
}