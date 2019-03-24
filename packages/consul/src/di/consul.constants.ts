import {
   blessGlobalProviderToken, blessLocalProviderToken, LocalProviderToken
} from '@jchptf/nestjs';
import { Consul, ConsulOptions } from 'consul';
import { EventEmitter } from 'events';

export const CONSUL_MODULE_ID = Symbol('@jchptf/consul');
export type CONSUL_MODULE_ID = typeof CONSUL_MODULE_ID;

const CONSUL_CLIENT = Symbol('Consul');
const CONSUL_OPTIONS = Symbol('ConsulOptions');
const CONSUL_EVENT_EMITTER = Symbol('EventEmitter');

export interface IConsulModuleTokens
{
   [CONSUL_CLIENT]: Consul;
   [CONSUL_OPTIONS]: ConsulOptions;
   [CONSUL_EVENT_EMITTER]: EventEmitter;
}

function blessLocal<Token extends keyof IConsulModuleTokens>(
   token: Token): LocalProviderToken<IConsulModuleTokens[Token], CONSUL_MODULE_ID, Token>
{
   return blessLocalProviderToken(token);
}

// TODO: This first one is really global!
export const CONSUL_CLIENT_PROVIDER_TOKEN = blessGlobalProviderToken(CONSUL_CLIENT);

export const CONSUL_OPTIONS_PROVIDER_TOKEN = blessLocal(CONSUL_OPTIONS);
export const CONSUL_EVENT_EMITTER_PROVIDER_TOKEN = blessLocal(CONSUL_EVENT_EMITTER);
