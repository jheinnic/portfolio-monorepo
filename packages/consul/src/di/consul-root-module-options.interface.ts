import { DynamicModuleConfig, IBaseConfigProps, IModule } from '@jchptf/nestjs';

import { CONSUL_OPTIONS, ConsulModuleId } from './consul.constants';

export type ConsulRootModuleOptions<Consumer extends IModule> = DynamicModuleConfig<
   typeof ConsulModuleId,
   IBaseConfigProps<Consumer>,
   ConsulModuleId,
   typeof CONSUL_OPTIONS
>;
