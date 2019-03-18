import {
   getDynamicModuleKind, getGlobalProviderToken, getLocalProviderToken, getModuleIdentifier,
   getNamedTypeIntent,
} from '@jchptf/nestjs';
import { Consul, ConsulOptions } from 'consul';

export const CONSUL_MODULE_ID = getModuleIdentifier('@jchptf/consul');

const IConsul = getNamedTypeIntent<Consul>('Consul');
const ConsulOptions = getNamedTypeIntent<ConsulOptions>('ConsulOptions');
const EventEmitter = getNamedTypeIntent<NodeJS.EventEmitter>('EventEmitter');

export const CONSUL_CLIENT_PROVIDER =
   getGlobalProviderToken<Consul>(IConsul);
export const CONSUL_OPTIONS_PROVIDER =
   getLocalProviderToken<ConsulOptions>(CONSUL_MODULE_ID, ConsulOptions);
export const CONSUL_EVENT_EMITTER_PROVIDER =
   getLocalProviderToken<NodeJS.EventEmitter>(CONSUL_MODULE_ID, EventEmitter);

export const CONSUL_SERVICE_DYNAMIC_MODULE_TYPE =
   getDynamicModuleKind(CONSUL_MODULE_ID, 'ServicesDynamicModule');
export const CONSUL_WATCH_DYNAMIC_MODULE_TYPE =
   getDynamicModuleKind(CONSUL_MODULE_ID, 'WatchesDynamicModule');
