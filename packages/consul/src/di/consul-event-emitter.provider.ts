import { CONSUL_EVENT_EMITTER_PROVIDER_TOKEN } from './consul.constants';
import { EventEmitter } from 'events';
import { NestProvider } from '@jchptf/nestjs';

export const CONSUL_EVENT_EMITTER_PROVIDER: NestProvider<EventEmitter> = {
   provide: CONSUL_EVENT_EMITTER_PROVIDER_TOKEN,
   useFactory: async (): Promise<EventEmitter> => new EventEmitter(),
   inject: [],
};
