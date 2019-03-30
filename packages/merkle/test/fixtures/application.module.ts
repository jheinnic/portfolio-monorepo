import { Module } from '@nestjs/common';
import { MODULE_ID } from '@jchptf/nestjs';
import { TestModule } from './test.module';

@Module({
   imports: [TestModule],
   exports: [TestModule],
})
export class ApplicationModule
{
   public static readonly [MODULE_ID] = Symbol('@jchptf/application');
}
