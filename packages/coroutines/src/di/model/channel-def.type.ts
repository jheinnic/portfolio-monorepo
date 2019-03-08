import { MonoTypeChannelDef } from './mono-type-channel-def.interface';
import { TxTypeChannelDef } from './tx-type-channel-def.interface';

export type ChannelDef<Input, Output = Input> =
   MonoTypeChannelDef<Input> | TxTypeChannelDef<Input, Output>;