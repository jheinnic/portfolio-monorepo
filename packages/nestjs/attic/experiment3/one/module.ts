import { MODULE_ID } from '@jchptf/nestjs';

export class OneModule {
   public static readonly [MODULE_ID] = Symbol('OneModule');
}
