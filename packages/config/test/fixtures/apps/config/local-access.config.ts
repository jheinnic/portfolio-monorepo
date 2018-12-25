import {IsOptional} from 'class-validator';

import {configClass, configProp} from '../../../../src/decorators';
import '@jchptf/reflection';

@configClass("eth.lotto.deployment.localAccess")
export class LocalAccess {
   @configProp("rootPath")
   @IsOptional()
   rootPath: string = '';
}