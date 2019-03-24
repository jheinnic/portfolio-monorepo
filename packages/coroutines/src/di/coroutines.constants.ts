import { AsyncSink } from 'ix';
import { Chan } from 'medium';

import { blessLocalProviderToken, LocalProviderToken } from '@jchptf/nestjs';
import { IAdapter } from '@jchptf/api';

import { IConcurrentWorkFactory, ILimiter, IChanMonitor } from '../interfaces';

export const COROUTINES_MODULE_ID = Symbol('@jchptf/coroutines');
export type COROUTINES_MODULE_ID = typeof COROUTINES_MODULE_ID;

export const CONCURRENT_WORK_FACTORY = Symbol('IConcurrentWorkFactory');
export const CHAN = Symbol('IAdapter<Chan<any, any>>');
export const CHAN_MONITOR = Symbol('IChanMonitor<any>');
export const LIMITER = Symbol('ILimiter');
export const ASYNC_SINK = Symbol('AsyncSink<any>');

export interface ICoroutinesModuleTokens {
   [CONCURRENT_WORK_FACTORY]: IConcurrentWorkFactory;
   [CHAN]: IAdapter<Chan<any, any>>;
   [CHAN_MONITOR]: IChanMonitor<any>;
   [LIMITER]: ILimiter;
   [ASYNC_SINK]: AsyncSink<any>;
}

function blessLocal<Token extends keyof ICoroutinesModuleTokens>(
   token: Token
): LocalProviderToken<ICoroutinesModuleTokens[Token], COROUTINES_MODULE_ID, Token>
{
   return blessLocalProviderToken(token);
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
// from one Chan to another Chan, with a transformative Transducer in between.
export const CHAN_PROVIDER_TOKEN = blessLocal(CHAN);
export const CHAN_MONITOR_PROVIDER_TOKEN = blessLocal(CHAN_MONITOR);
export const LIMITER_PROVIDER_TOKEN = blessLocal(LIMITER);
export const ASYNC_SINK_PROVIDER_TOKEN = blessLocal(ASYNC_SINK);
