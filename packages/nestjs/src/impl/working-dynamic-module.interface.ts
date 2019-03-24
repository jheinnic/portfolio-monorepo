import { DynamicModule } from '@nestjs/common';

export interface IWorkingDynamicModule
{
   readonly supplier: DynamicModule;
   readonly consumer: DynamicModule;
}
