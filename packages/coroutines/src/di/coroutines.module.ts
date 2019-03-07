import { Global, Module } from '@nestjs/common';

import { ConcurrentWorkFactory } from '../concurrent-work-factory.service';
import { CONCURRENT_WORK_FACTORY } from './coroutines.constants';

const coroutineProviders = [
   {
      provide: CONCURRENT_WORK_FACTORY,
      useClass: ConcurrentWorkFactory
   }
];

@Global()
@Module({
   providers: [...coroutineProviders],
   exports: [...coroutineProviders],
})
export class CoroutinesModule
{ }
