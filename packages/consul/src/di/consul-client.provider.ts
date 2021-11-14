import consul, { Consul, Consul as IConsul, ConsulOptions } from 'consul';
import { EventEmitter } from 'events';
import * as util from 'util';

import { DynamicProviderBindingStyle, IByFactoryCall } from '@jchptf/nestjs';

import {
   CONSUL_CLIENT_PROVIDER_TOKEN, CONSUL_EVENT_EMITTER_PROVIDER_TOKEN, CONSUL_OPTIONS_PROVIDER_TOKEN,
} from './consul.constants';

export const CONSUL_CLIENT_PROVIDER: IByFactoryCall<
   Consul, typeof CONSUL_CLIENT_PROVIDER_TOKEN, any
> = {
   style: DynamicProviderBindingStyle.INJECTED_FACTORY,
   // provide: CONSUL_CLIENT_PROVIDER_TOKEN,
   useFactory:
      async (consulOptions: ConsulOptions, emitter: EventEmitter): Promise<IConsul> =>
      {
         return new consul({
            ...consulOptions,
            promisify: util.promisify,
            defaults: {
               ...consulOptions.defaults,
               timeout: 5000,
               ctx: emitter,
            },
         });
      },
   inject: [CONSUL_OPTIONS_PROVIDER_TOKEN, CONSUL_EVENT_EMITTER_PROVIDER_TOKEN],
};
