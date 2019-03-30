import {
   blessGlobalProviderToken, blessLocalProviderToken, LocalProviderToken, MODULE_ID,
} from '@jchptf/nestjs';
import { Consul, ConsulOptions } from 'consul';
import { EventEmitter } from 'events';

export const CONSUL_MODULE_ID = Symbol('@jchptf/consul');
export type CONSUL_MODULE_ID = typeof CONSUL_MODULE_ID;

export const CONSUL_CLIENT = Symbol('Consul');
export const CONSUL_OPTIONS = Symbol('ConsulOptions');
export const CONSUL_EVENT_EMITTER = Symbol('EventEmitter');

export class ConsulModuleId
{
   public static readonly [MODULE_ID] = CONSUL_MODULE_ID;

   [CONSUL_CLIENT]: Consul;
   [CONSUL_OPTIONS]: ConsulOptions;
   [CONSUL_EVENT_EMITTER]: EventEmitter;
}

function blessLocal<Token extends keyof ConsulModuleId>(token: Token):
   LocalProviderToken<ConsulModuleId[Token], typeof ConsulModuleId, Token>
{
   return blessLocalProviderToken(token, ConsulModuleId);
}

export const CONSUL_CLIENT_PROVIDER_TOKEN = blessGlobalProviderToken(CONSUL_CLIENT);

export const CONSUL_OPTIONS_PROVIDER_TOKEN = blessLocal(CONSUL_OPTIONS);
export const CONSUL_EVENT_EMITTER_PROVIDER_TOKEN = blessLocal(CONSUL_EVENT_EMITTER);
