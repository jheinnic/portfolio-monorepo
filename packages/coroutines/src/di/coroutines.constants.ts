import { AsyncSink } from 'ix';
import { Chan } from 'medium';

import { blessLocalProviderToken, LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';
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

export class CoroutinesModuleId
{
   public static readonly [MODULE_ID] = COROUTINES_MODULE_ID;

   [CONCURRENT_WORK_FACTORY]: IConcurrentWorkFactory;

   // These next four are not immediately in use
   [CHAN]: IAdapter<Chan<any, any>>;
   [CHAN_MONITOR]: IChanMonitor<any>;
   [LIMITER]: ILimiter;
   [ASYNC_SINK]: AsyncSink<any>;
   [CHAN_FACTORY]: IFactoryMethod<IAdapter<Chan<any, any>>>;
   [ASYNC_SINK_FACTORY]: IFactoryMethod<AsyncSink<any>>;
}

function blessLocal<Token extends keyof CoroutinesModuleId>(
   token: Token,
): LocalProviderToken<CoroutinesModuleId[Token], typeof CoroutinesModuleId, Token>
{
   return blessLocalProviderToken(token, CoroutinesModuleId);
}

export const CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN =
   blessLocal(CONCURRENT_WORK_FACTORY);

// Expect these will need to proliferate to acquire 'role' qualifiers in order to be
// useful.  I predict there will be interfaces like ICoroutinesModuleTokens that are
// used to label a pod of typed roles for DI-exchange across DynamicModule boundaries--
// both input and output bindings.  A given token can get reused in more than one
// such DynamicModule interaction, but may only be used in any given interaction at
// most one time.  Collaborations that involve two things of the same type performing
// distinct roles will require multiple tokens mapping to the same type to describe.
//
// As an example, consider the ConcurrentWorkFactory methods for transferring objects
// from one Chan to another Chan, with a Transducer in between.  That already would
// require two role-specific Chan provider tokens to describe.
export const CHAN_PROVIDER_TOKEN = blessLocal(CHAN);
export const CHAN_MONITOR_PROVIDER_TOKEN = blessLocal(CHAN_MONITOR);
export const LIMITER_PROVIDER_TOKEN = blessLocal(LIMITER);
export const ASYNC_SINK_PROVIDER_TOKEN = blessLocal(ASYNC_SINK);
export const CHAN_FACTORY_PROVIDER_TOKEN = blessLocal(CHAN_FACTORY);
export const ASYNC_SINK_FACTORY_PROVIDER_TOKEN = blessLocal(ASYNC_SINK_FACTORY);
