import { Transducer } from 'transducers-js';
import { ChannelKind } from './channel-kind.enum';
import { ChanBufferType } from 'index';
import { DynamicProviderToken } from '@jchptf/nestjs';
import { IAdapter } from '@jchptf/api';
import { Chan } from "medium";

export interface TxTypeChannelDef<InType, OutType>
{
   readonly kind: ChannelKind.TX;
   readonly transducer: Transducer<InType, OutType>;
   readonly bufSize?: number;
   readonly bufType?: ChanBufferType;
   readonly providerToken: DynamicProviderToken<IAdapter<Chan<InType, OutType>>>;
}