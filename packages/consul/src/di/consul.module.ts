import { Consul } from 'consul';

import { Global, Module, DynamicModule } from '@nestjs/common';

import { buildDynamicModule, IDynamicModuleBuilder, IModule } from '@jchptf/nestjs';

import { CONSUL_OPTIONS, ConsulModuleId } from './consul.constants';
import { CONSUL_CLIENT_PROVIDER } from './consul-client.provider';
import { CONSUL_EVENT_EMITTER_PROVIDER } from './consul-event-emitter.provider';
import { ConsulRootModuleOptions } from './consul-root-module-options.interface';

@Global()
@Module({})
export class ConsulModule extends ConsulModuleId
{
   public static forRoot<Consumer extends IModule>(
      options: ConsulRootModuleOptions<Consumer>): DynamicModule
   {
      return buildDynamicModule(
         ConsulModule,
         options.forModule,
         (builder: IDynamicModuleBuilder<typeof ConsulModuleId, Consumer>): void => {
            builder
               .acceptBoundImport(options[CONSUL_OPTIONS])
               .acceptBoundImport(CONSUL_EVENT_EMITTER_PROVIDER)
               .acceptBoundImport<Consul>(CONSUL_CLIENT_PROVIDER);
            // Unnecessary as CONSUL_CLIENT_PROVIDER is marked as global.
            // .exportFromSupplier(CONSUL_CLIENT_PROVIDER_TOKEN, client.exportTo);
         },
      );
   }

   // public static forRoot<Consumer extends IModule>(
   //    rootModule: Consumer,
   //    options: IBoundDynamicModuleImport<ConsulOptions, typeof ConsulModuleId, Consumer>,
   // ): DynamicModule
   // {
   //    return buildDynamicModule(
   //       ConsulModuleId,
   //       rootModule,
   //       (builder: IDynamicModuleBuilder<typeof ConsulModuleId, Consumer>): void => {
   //          builder
   //             .acceptBoundImport(options)
   //             .acceptBoundImport(CONSUL_EVENT_EMITTER_PROVIDER)
   //             .acceptBoundImport<Consul>(CONSUL_CLIENT_PROVIDER);
   //             // Unnecessary as CONSUL_CLIENT_PROVIDER is marked as global.
   //             // .exportFromSupplier(CONSUL_CLIENT_PROVIDER_TOKEN, client.exportTo);
   //       },
   //    );
   // }
}
