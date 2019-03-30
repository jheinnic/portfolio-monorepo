// Scope building blocks.
import { Type } from '@nestjs/common';
import { MODULE_ID } from './constants';

export interface IModule extends Type<any>
{
   readonly [MODULE_ID]: symbol;
}
