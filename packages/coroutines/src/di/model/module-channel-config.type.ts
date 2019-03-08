import { MonoType } from './mono-type.type';
import { MonoTypeChannelDef } from './mono-type-channel-def.interface';
import { TxType } from './tx-type.type';
import { TxTypeChannelDef } from './tx-type-channel-def.interface';
import { ChannelModuleTypeSpec } from './channel-module-type-spec.inteface';

export type ModuleChannelConfig<T extends ChannelModuleTypeSpec> = {
   [K in keyof T]: T[K] extends MonoType<infer M>
      ? MonoTypeChannelDef<M>
      : (T[K] extends TxType<[infer I, infer O]>
         ? TxTypeChannelDef<I, O>
         : never);
}