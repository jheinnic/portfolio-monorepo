import { Module } from '@nestjs/common';
import { BindableProviderTokens, GLOBAL_MODULE_ID, MODULE_ID } from '@jchptf/nestjs';
import { A_SYMBOL, MY_MODULE_ID } from './names.constants';
import { Class, ISomething } from './primitive';

@Module({
   providers: [],
})
export class MyModule
{
   public readonly [MODULE_ID]: symbol = MY_MODULE_ID; // Symbol('MY_MODULE_ID');

   [A_SYMBOL]: Class;
   localClass!: Class;
}

@Module({
   providers: [],
})
export class MyGlobalModule
{
   public readonly [MODULE_ID] = GLOBAL_MODULE_ID; // Symbol('MY_MODULE_ID');

   [A_SYMBOL]: ISomething;
   somethingGlobal!: ISomething;
}

@Module({
   providers: [
   ],
})
export class NotAModule {
   [A_SYMBOL]: typeof Class = Class;
}

export const A_SYMBOL_LOCAL: BindableProviderTokens<MyModule, Class> = typeof A_SYMBOL;
export const A_SYMBOL_GLOBAL: BindableProviderTokens<MyGlobalModule, Class> = typeof A_SYMBOL;
