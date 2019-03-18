import { getLocalProviderToken, getModuleIdentifier, } from '@jchptf/nestjs';

import { IConcurrentWorkFactory } from '../interfaces';

export const COROUTINES_MODULE = getModuleIdentifier('@jchptf/coroutines');

// export const CHAN_TYPE = 'IAdapter<Chan<any, any>>';

// export const MONITOR_TYPE = 'IChanMonitor<any>';

// export const LIMITER_TYPE = 'ILimiter';

// export const ASYNC_SINK_TYPE = 'AsyncSink<any>';

export const CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN =
   getLocalProviderToken<IConcurrentWorkFactory>('IConcurrentWorkFactory');
