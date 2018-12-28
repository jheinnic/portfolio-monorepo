import {Global, Module} from '@nestjs/common';
import {CO_TYPES} from './coroutines.constants';
import {ConcurrentWorkFactory} from '../concurrent-work-factory.service';

const coroutineProviders = [
   {
      provide: CO_TYPES.ConcurrentWorkFactory,
      useClass: ConcurrentWorkFactory
   }
];

@Global()
@Module({
   providers: [...coroutineProviders],
   exports: [...coroutineProviders]
})
export class CoroutinesModule { }