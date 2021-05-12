import { AsyncSink } from 'ix';
import { Chan } from 'medium';

// import { prepareModule, LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';
import { IAdapter, IFactoryMethod } from '@jchptf/api';

import { IConcurrentWorkFactory, ILimiter, IChanMonitor } from '../interfaces';

export const COROUTINES_MODULE_ID = Symbol('@jchptf/coroutines');
export type COROUTINES_MODULE_ID = typeof COROUTINES_MODULE_ID;

export const CONCURRENT_WORK_FACTORY = Symbol('IConcurrentWorkFactory');
export const CHAN = Symbol('IAdapter<Chan<any, any>>');
export const CHAN_MONITOR = Symbol('IChanMonitor<any>');
export const LIMITER = Symbol('ILimiter');
export const ASYNC_SINK = Symbol('AsyncSink<any>');
export const CHAN_FACTORY = Symbol('IFactoryMethod<IAdapter<Chan<any, any>>>');
export const ASYNC_SINK_FACTORY = Symbol('IFactoryMethod<AsyncSink<any>>');

export const ASYNC_SINK_FACTORY_PROVIDER_TOKEN: unique symbol = Symbol('aa');
export const CHAN_FACTORY_PROVIDER_TOKEN: unique symbol = Symbol('aa');
export const CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN: unique symbol = Symbol('aa');

export class CoroutinesModuleRegistry
{
   [CONCURRENT_WORK_FACTORY]: IConcurrentWorkFactory;

   // These next four are not immediately in use
   [CHAN]: IAdapter<Chan<any, any>>;
   [CHAN_MONITOR]: IChanMonitor<any>;
   [LIMITER]: ILimiter;
   [ASYNC_SINK]: AsyncSink<any>;
   [CHAN_FACTORY]: IFactoryMethod<IAdapter<Chan<any, any>>>;
   [ASYNC_SINK_FACTORY]: IFactoryMethod<AsyncSink<any>>;
}