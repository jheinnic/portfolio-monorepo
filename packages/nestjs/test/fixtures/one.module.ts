import { Module } from '@nestjs/common';
import { MODULE_ID } from '@jchptf/nestjs';
import { ONE_MODULE_ID } from './names.constants';

@Module({
   providers: [
   ],
})
export class OneModule
{
   public readonly [MODULE_ID] = ONE_MODULE_ID;
}
