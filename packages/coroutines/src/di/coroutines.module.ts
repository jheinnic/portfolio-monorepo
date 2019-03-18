import { Module } from '@nestjs/common';

import { ConcurrentWorkFactory } from '../concurrent-work-factory.service';
import { CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN, COROUTINES_MODULE } from './coroutines.constants';
import { MODULE_IDENTIFIER, ModuleIdentifier } from '@jchptf/nestjs';

const coroutineProviders = [
   {
      provide: CONCURRENT_WORK_FACTORY_PROVIDER_TOKEN,
      useClass: ConcurrentWorkFactory,
   },
];

@Module({
   providers: [...coroutineProviders],
   exports: [...coroutineProviders],
})
export class CoroutinesModule
{
   public static readonly [MODULE_IDENTIFIER]: ModuleIdentifier = COROUTINES_MODULE;
}
