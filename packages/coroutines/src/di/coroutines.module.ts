import { Module } from '@nestjs/common';

import { ConcurrentWorkFactory } from '../concurrent-work-factory.service';
import { CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN, CoroutinesModuleId } from './coroutines.constants';

const coroutineProviders = [
   {
      provide: CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN,
      useClass: ConcurrentWorkFactory,
   },
];

@Module({
   providers: coroutineProviders,
   exports: [CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN],
})
export class CoroutinesModule extends CoroutinesModuleId
{ }
