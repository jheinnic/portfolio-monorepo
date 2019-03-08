import { MonoType } from './mono-type.type';
import { TxType } from './tx-type.type';

export interface ChannelModuleTypeSpec
{
   [key: string]: MonoType<any> | TxType<any[]>
}

