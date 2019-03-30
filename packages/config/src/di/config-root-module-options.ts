import { DynamicModuleConfigTwo, IBaseConfigProps, IModule } from '@jchptf/nestjs';

import { ConfigModuleId, DOTENV_CONFIG_OPTIONS } from './config.constants';

export type ConfigRootModuleOptions<Consumer extends IModule> = DynamicModuleConfigTwo<
   typeof ConfigModuleId,
   IBaseConfigProps<Consumer>,
   ConfigModuleId,
   never,
   typeof DOTENV_CONFIG_OPTIONS>;
