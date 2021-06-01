import { Module } from '@nestjs/common';
import { MODULE_ID } from '@jchptf/nestjs';
import { MY_MODULE_ID } from './names.constants';

@Module({
   providers: [
   ],
})
export class MyModule
{
   public static readonly [MODULE_ID] = MY_MODULE_ID; // Symbol('MY_MODULE_ID');
}
