import { Module } from '@nestjs/common';

import { ConcurrentWorkFactory } from '../concurrent-work-factory.service';
import {
   ASYNC_SINK_FACTORY_PROVIDER_TOKEN, CHAN_FACTORY_PROVIDER_TOKEN,
   CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN, CoroutinesModuleId,
} from './coroutines.constants';
import { IConcurrentWorkFactory } from '../interfaces';

const coroutineProviders = [
   {
      provide: CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN,
      useClass: ConcurrentWorkFactory,
   },
   {
      provide: CHAN_FACTORY_PROVIDER_TOKEN,
      useFactory: (cwf: IConcurrentWorkFactory) => () => cwf.createChan(),
      inject: [CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN],
   },
   {
      provide: ASYNC_SINK_FACTORY_PROVIDER_TOKEN,
      useFactory: (cwf: IConcurrentWorkFactory) => () => cwf.createAsyncSink(),
      inject: [CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN],
   },
];

@Module({
   providers: coroutineProviders,
   exports: [
      CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN,
      CHAN_FACTORY_PROVIDER_TOKEN,
      ASYNC_SINK_FACTORY_PROVIDER_TOKEN,
   ],
})
export class CoroutinesModule extends CoroutinesModuleId
{}
