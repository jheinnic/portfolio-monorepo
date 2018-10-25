import {interfaces} from 'inversify';

import {ConfigLoader} from '../config-loader.service';
import {CONFIG_TYPES} from './config-loader.types';

export function configLoaderModule(bind: interfaces.Bind)
{
   bind(CONFIG_TYPES.ConfigLoader)
      .to(ConfigLoader)
      .inSingletonScope();
}
