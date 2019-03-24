import { IDynamicModuleBuilder } from 'dynamic-module-builder.interface';

import { DynamicModuleParam } from './dynamic-module-param.interface';
import { applyDynamicModuleParam } from './apply-dynamic-module-param.function';
import { IModule } from '../provider-token.type';

export function applyDynamicModuleParams<
   SupplierId extends IModule, ConsumerId extends IModule
>(
   builder: IDynamicModuleBuilder<SupplierId, ConsumerId>,
   params: Iterable<DynamicModuleParam<any, SupplierId, ConsumerId>>,
) {
   for (const nextParam of params) {
      applyDynamicModuleParam(builder, nextParam);
   }
}
