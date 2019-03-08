import { Chan } from 'medium';
import { IAdapter } from '@jchptf/api';
import { DynamicProviderToken } from '@jchptf/nestjs';

import { ChannelModuleTypeSpec } from './channel-module-type-spec.inteface';
import { MonoType } from './mono-type.type';
import { TxType } from './tx-type.type';

export type ModuleTokenProviders<T extends ChannelModuleTypeSpec> = {
   [K in keyof T]: T[K] extends MonoType<infer M>
      ? DynamicProviderToken<IAdapter<Chan<M, M>>>
      : (T[K] extends TxType<[infer I, infer O]>
         ? DynamicProviderToken<IAdapter<Chan<I, O>>>
         : never);
}
