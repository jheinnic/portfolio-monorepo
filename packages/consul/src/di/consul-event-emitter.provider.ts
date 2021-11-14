import { CONSUL_EVENT_EMITTER_PROVIDER_TOKEN, ConsulModuleId } from './consul.constants';
import { EventEmitter } from 'events';
import { DynamicProviderBindingStyle, IByFactoryCall } from '@jchptf/nestjs';

export const CONSUL_EVENT_EMITTER_PROVIDER: IByFactoryCall<ConsulModuleId, typeof CONSUL_EVENT_EMITTER_PROVIDER_TOKEN, any> = {
      style: DynamicProviderBindingStyle.INJECTED_FACTORY,
      // provide: CONSUL_EVENT_EMITTER_PROVIDER_TOKEN,
      useFactory: (): EventEmitter => new EventEmitter(),
      inject: []
   };
