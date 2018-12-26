import {Global, Module} from '@nestjs/common';
import {CO_TYPES} from './coroutines-di.constants';
import {ConcurrentWorkFactory} from '..';

const coroutineProviders = [
   {
      provide: CO_TYPES.ConcurrentWorkFactory,
      useClass: ConcurrentWorkFactory
   }
];

@Global()
@Module({
   providers: coroutineProviders,
   exports: coroutineProviders
})
export class CoroutinesModule { }