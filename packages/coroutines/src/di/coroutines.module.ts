import { Module } from '@nestjs/common';

import {coroutineProviders} from "./coroutines.providers";
import {
   ASYNC_SINK_FACTORY_PROVIDER_TOKEN, CHAN_FACTORY_PROVIDER_TOKEN,
   CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN
} from './coroutines.constants';


@Module({
   providers: coroutineProviders,
   exports: [
      CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN,
      CHAN_FACTORY_PROVIDER_TOKEN,
      ASYNC_SINK_FACTORY_PROVIDER_TOKEN,
   ],
})
export class CoroutinesModule {}
