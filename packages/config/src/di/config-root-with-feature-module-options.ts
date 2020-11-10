import { DynamicModuleConfig, IModule, IModuleRegistry } from '@jchptf/nestjs';

import { ConfigModuleId, DOTENV_CONFIG_OPTIONS } from './config.constants';
import { IFeatureConfigProps } from './feature-config-props.interface';

export type ConfigRootWithFeatureModuleOptions<Consumer extends IModule<IModuleRegistry>> =
  DynamicModuleConfig<
   typeof ConfigModule, Consumer, Consumer,
   IFeatureConfigProps<Consumer>,
   ConfigModuleId,
   never,
   typeof DOTENV_CONFIG_OPTIONS>;
