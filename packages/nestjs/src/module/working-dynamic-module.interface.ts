import { DynamicModule, Type } from '@nestjs/common';

export interface IWorkingDynamicModule
{
   readonly outer: DynamicModule;
   readonly inner: DynamicModule;
   readonly consumer: Type<any>;
}
