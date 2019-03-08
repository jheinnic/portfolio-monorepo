import { getDynamicProviderToken, ModuleIdentifier } from '@jchptf/nestjs';
import { ChanBufferType } from '../interfaces';
import { Transducer } from 'transducers-js';
import { MonoTypeChannelDef } from './model/mono-type-channel-def.interface';
import { TxTypeChannelDef } from './model/tx-type-channel-def.interface';
import { ChannelKind } from './model/channel-kind.enum';
import { IAdapter } from '@jchptf/api';
import { Chan } from 'medium';
import { CHAN_TYPE, COROUTINE_DYNAMIC_CHANNELS_BINDING } from './coroutines.constants';

export function getMonoTxChannelDefinition<Type>(
   moduleId: ModuleIdentifier,
   name: string,
   transducer: Transducer<Type, Type>,
   bufSize?: number,
   bufType?: ChanBufferType
): MonoTypeChannelDef<Type>
{
   const providerToken =
      getDynamicProviderToken<IAdapter<Chan<Type, Type>>>(
         moduleId, COROUTINE_DYNAMIC_CHANNELS_BINDING, CHAN_TYPE, name);

   return {
      kind: ChannelKind.MONO,
      transducer,
      bufSize,
      bufType,
      providerToken
   };
}

export function getPassThruChannelDefinition<Type>(
   moduleId: ModuleIdentifier,
   name: string,
   bufSize?: number,
   bufType?: ChanBufferType
): MonoTypeChannelDef<Type>
{
   const providerToken =
      getDynamicProviderToken<IAdapter<Chan<Type, Type>>>(
         moduleId, COROUTINE_DYNAMIC_CHANNELS_BINDING, CHAN_TYPE, name);

   return {
      kind: ChannelKind.MONO,
      bufSize,
      bufType,
      providerToken
   };
}

export function getTxChannelDefinition<InType, OutType>(
   moduleId: ModuleIdentifier,
   name: string,
   transducer: Transducer<InType, OutType>,
   bufSize?: number,
   bufType?: ChanBufferType
): TxTypeChannelDef<InType, OutType>
{
   const providerToken =
      getDynamicProviderToken<IAdapter<Chan<InType, OutType>>>(
         moduleId, COROUTINE_DYNAMIC_CHANNELS_BINDING, CHAN_TYPE, name);

   return {
      kind: ChannelKind.TX,
      transducer,
      bufSize,
      bufType,
      providerToken
   };
}

