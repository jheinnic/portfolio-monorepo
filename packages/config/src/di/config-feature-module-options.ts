import { DynamicModuleConfigTwo, IModule } from '@jchptf/nestjs';

import { ConfigModuleId } from './config.constants';
import { IFeatureConfigProps } from './feature-config-props.interface';

export type ConfigFeatureModuleOptions<Consumer extends IModule> =
   DynamicModuleConfigTwo<typeof ConfigModuleId, IFeatureConfigProps<Consumer>, ConfigModuleId>;
