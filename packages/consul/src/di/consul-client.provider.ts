import consul, { Consul, Consul as IConsul, ConsulOptions } from 'consul';
import { EventEmitter } from 'events';
import * as util from 'util';

import { DynamicProviderBindingStyle, IBySupplierFactoryCall } from '@jchptf/nestjs';

import {
   CONSUL_CLIENT_PROVIDER_TOKEN, CONSUL_EVENT_EMITTER_PROVIDER_TOKEN, CONSUL_OPTIONS_PROVIDER_TOKEN,
   ConsulModuleId,
} from './consul.constants';

export const CONSUL_CLIENT_PROVIDER: IBySupplierFactoryCall<
   Consul, typeof ConsulModuleId, any,
   (opt: ConsulOptions, emitter: EventEmitter) => Promise<Consul>
> = {
   style: DynamicProviderBindingStyle.SUPPLIER_INJECTED_FUNCTION,
   provide: CONSUL_CLIENT_PROVIDER_TOKEN,
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
