import {IsOptional} from 'class-validator';

import {configClass, configProp} from '../../../../src/decorators';

@configClass("eth.lotto.deployment.localAccess")
export class LocalAccess {
   @configProp("rootPath")
   @IsOptional()
   rootPath: string = '';
}