import { CONSUL_EVENT_EMITTER_PROVIDER_TOKEN, ConsulModuleId } from './consul.constants';
import { EventEmitter } from 'events';
import { DynamicProviderBindingStyle, IFromFactoryCall } from '@jchptf/nestjs';

export const CONSUL_EVENT_EMITTER_PROVIDER:
   IFromFactoryCall<EventEmitter, typeof ConsulModuleId, any> = {
      style: DynamicProviderBindingStyle.FACTORY_METHOD_CALL,
      provide: CONSUL_EVENT_EMITTER_PROVIDER_TOKEN,
      useFactory: (): EventEmitter => new EventEmitter(),
   };
