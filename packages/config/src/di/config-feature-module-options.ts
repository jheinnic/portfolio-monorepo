import { DynamicModuleConfig, IModule } from '@jchptf/nestjs';

import { ConfigModuleId } from './config.constants';
import { IFeatureConfigProps } from './feature-config-props.interface';

export type ConfigFeatureModuleOptions<Consumer extends IModule> =
   DynamicModuleConfig<typeof ConfigModuleId, IFeatureConfigProps<Consumer>, ConfigModuleId>;
