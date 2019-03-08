import { DynamicModule, Module } from '@nestjs/common';

import { ConcurrentWorkFactory } from '../concurrent-work-factory.service';
import {
   CONCURRENT_WORK_FACTORY, MODULE_CHANNEL_CONFIG_TOKEN_PROVIDER
} from './coroutines.constants';
import { ModuleIdentifier } from '@jchptf/nestjs';
import { ChannelModuleTypeSpec } from './model/channel-module-type-spec.inteface';
import { ModuleChannelConfig } from './model/module-channel-config.type';
import { IConcurrentWorkFactory } from '../interfaces';
import { ChannelKind } from './model/channel-kind.enum';
import { ChannelDef } from './model/channel-def.type';
import { illegalArgs } from '@thi.ng/errors';

const coroutineProviders = [
   {
      provide: CONCURRENT_WORK_FACTORY,
      useClass: ConcurrentWorkFactory
   }
];

@Module({
   providers: [...coroutineProviders],
   exports: [...coroutineProviders],
})
export class CoroutinesModule
{
   static forFeature<Signature extends ChannelModuleTypeSpec>(
      _moduleId: ModuleIdentifier,
      channelConfig: ModuleChannelConfig<Signature>
      // providerTokens: ModuleTokenProviders<Signature>
   ): DynamicModule
   {
      const configProvider = {
         provide: MODULE_CHANNEL_CONFIG_TOKEN_PROVIDER,
         useValue: channelConfig
      };

      const channelProviders = Object.entries(channelConfig)
         .map(
            (value: [string, ChannelDef<any>]) => {
               return {
                  provide: value[1].providerToken,
                  useFactory: (
                     channelConfig: ModuleChannelConfig<Signature>,
                     concurrentWorkFactory: IConcurrentWorkFactory
                  ) => {
                     const entry: ChannelDef<any, any> = channelConfig[value[0]];
                     switch (entry.kind) {
                        case ChannelKind.TX:
                        {
                           return concurrentWorkFactory.createTxChan(
                              entry.transducer, entry.bufSize, entry.bufType
                           );
                        }
                        case ChannelKind.MONO:
                        {
                           if (!!entry.transducer) {
                              return concurrentWorkFactory.createTxChan(
                                 entry.transducer, entry.bufSize, entry.bufType
                              );
                           }

                           return concurrentWorkFactory.createChan(
                              entry.bufSize, entry.bufType
                           );
                        }
                        default:
                        {
                           throw illegalArgs('Unreachable code');
                        }
                     }
                  },
                  inject: [configProvider, CONCURRENT_WORK_FACTORY]
               };
            }
         );

      return {
         module: CoroutinesModule,
         imports: [CoroutinesModule],
         providers: [configProvider, ...channelProviders],
         exports: channelProviders
      };
   }
}
