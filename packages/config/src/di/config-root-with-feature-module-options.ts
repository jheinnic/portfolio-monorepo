import { DynamicModuleConfigTwo, IModule } from '@jchptf/nestjs';

import { ConfigModuleId, DOTENV_CONFIG_OPTIONS } from './config.constants';
import { IFeatureConfigProps } from './feature-config-props.interface';

export type ConfigRootWithFeatureModuleOptions<Consumer extends IModule> = DynamicModuleConfigTwo<
   typeof ConfigModuleId,
   IFeatureConfigProps<Consumer>,
   ConfigModuleId,
   never,
   typeof DOTENV_CONFIG_OPTIONS>;
