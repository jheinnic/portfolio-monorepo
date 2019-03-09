import {
   getDynamicProviderBinding, getLocalProviderToken, getModuleIdentifier,
   getNamedTypeIntent
} from '@jchptf/nestjs';

import { IConcurrentWorkFactory } from '../interfaces';
import { Chan } from 'medium';
import { IAdapter } from '@jchptf/api';
import { ModuleChannelConfig } from './model/module-channel-config.type';
import { IChanMonitor } from '../interfaces/chan-monitor.interface';
import { AsyncSink } from 'ix';

export const COROUTINES_MODULE =
   getModuleIdentifier('@jchptf/coroutines');

const CONTENT_WORK_FACTORY =
   getNamedTypeIntent<IConcurrentWorkFactory>('IConcurrentWorkFactory');

export const MODULE_CHANNEL_CONFIG =
   getNamedTypeIntent<ModuleChannelConfig<any>>('ModuleChannelConfig');

export const CHAN_TYPE =
   getNamedTypeIntent<IAdapter<Chan<any, any>>>('IAdapter<Chan<any, any>>');

export const MONITOR_TYPE =
   getNamedTypeIntent<IChanMonitor<any>>('IChanMonitor<any>');

export const ASYNC_SINK_TYPE =
   getNamedTypeIntent<AsyncSink<any>>('AsyncSink<any>');

export const CONCURRENT_WORK_FACTORY =
   getLocalProviderToken<IConcurrentWorkFactory>(COROUTINES_MODULE, CONTENT_WORK_FACTORY);

export const MODULE_CHANNEL_CONFIG_TOKEN_PROVIDER =
   getLocalProviderToken<ModuleChannelConfig<any>>(COROUTINES_MODULE, MODULE_CHANNEL_CONFIG);

export const COROUTINE_DYNAMIC_CHANNELS_BINDING =
   getDynamicProviderBinding(COROUTINES_MODULE, 'ChanBinding');
