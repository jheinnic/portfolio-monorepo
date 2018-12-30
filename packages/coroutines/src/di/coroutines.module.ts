import {Global, Module} from '@nestjs/common';
import {CONCURRENT_WORK_FACTORY} from './coroutines.constants';
import {ConcurrentWorkFactory} from '../concurrent-work-factory.service';

const coroutineProviders = [
   {
      provide: CONCURRENT_WORK_FACTORY,
      useClass: ConcurrentWorkFactory
   }
];

@Global()
@Module({
   providers: [...coroutineProviders],
   exports: [...coroutineProviders]
})
export class CoroutinesModule { }