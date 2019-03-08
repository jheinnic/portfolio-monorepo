import {
   getDynamicProviderBinding, getLocalProviderToken, getModuleIdentifier,
   getNamedTypeIntent
} from '@jchptf/nestjs';

import { IConcurrentWorkFactory } from '../interfaces';
import { Chan } from 'medium';
import { IAdapter } from '@jchptf/api';
import { ModuleChannelConfig } from './model/module-channel-config.type';

export const COROUTINES_MODULE =
   getModuleIdentifier('@jchptf/coroutines');

const CWF =
   getNamedTypeIntent<IConcurrentWorkFactory>('IConcurrentWorkFactory');

export const MODULE_CHANNEL_CONFIG =
   getNamedTypeIntent<ModuleChannelConfig<any>>('ModuleChannelConfig');

export const CHAN_TYPE =
   getNamedTypeIntent<IAdapter<Chan<any, any>>>('IAdapter<Chan<any, any>>');

export const CONCURRENT_WORK_FACTORY =
   getLocalProviderToken<IConcurrentWorkFactory>(COROUTINES_MODULE, CWF);

export const MODULE_CHANNEL_CONFIG_TOKEN_PROVIDER =
   getLocalProviderToken<ModuleChannelConfig<any>>(COROUTINES_MODULE, MODULE_CHANNEL_CONFIG);

export const COROUTINE_DYNAMIC_CHANNELS_BINDING =
   getDynamicProviderBinding(COROUTINES_MODULE, "ChanBinding");
