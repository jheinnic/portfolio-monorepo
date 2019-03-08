import { Transducer } from 'transducers-js';
import { ChannelKind } from './channel-kind.enum';
import { Chan } from 'medium';
import { DynamicProviderToken } from '@jchptf/nestjs';
import { IAdapter } from '@jchptf/api';
import { ChanBufferType } from '../../interfaces';

export interface MonoTypeChannelDef<Type>
{
   readonly kind: ChannelKind.MONO;
   readonly transducer?: Transducer<Type, Type>
   readonly bufSize?: number;
   readonly bufType?: ChanBufferType;
   readonly providerToken: DynamicProviderToken<IAdapter<Chan<Type, Type>>>;
}