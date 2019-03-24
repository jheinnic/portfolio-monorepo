import { ModuleIdentifier } from 'module-identifier.type';
import { IDynamicModuleBuilder } from 'dynamic-module-builder.interface';

import { DynamicModuleParam } from './dynamic-module-param.interface';
import { applyDynamicModuleParam } from './apply-dynamic-module-param.function';

export function applyDynamicModuleParams<
   SupplierId extends ModuleIdentifier, ConsumerId extends ModuleIdentifier
>(
   builder: IDynamicModuleBuilder<SupplierId, ConsumerId>,
   params: Iterable<DynamicModuleParam<any, SupplierId, ConsumerId>>,
) {
   for (const nextParam of params) {
      applyDynamicModuleParam(builder, nextParam);
   }
}
