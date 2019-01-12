import { getGlobalProviderToken, getModuleIdentifier, getNamedTypeIntent } from '@jchptf/api';
import { Consul } from 'consul';

export const CONSUL_MODULE_ID = getModuleIdentifier('@jchptf/consul');

const IConsul = getNamedTypeIntent<Consul>('Consul');

export const CONFIG_FILE_READER_PROVIDER =
   getGlobalProviderToken<Consul>(IConsul);
export const CONFIG_CLASS_FINDER_PROVIDER =
   getGlobalProviderToken<IConfigClassFinder>(CCF);
export const CONFIGURATION_FACTORY_PROVIDER =
   getGlobalProviderToken<IConfigProviderFactory>(CF);