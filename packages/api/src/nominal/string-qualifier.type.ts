import { Nominal } from './nominal.type';

export type StringQualifier<Intent extends string, Type extends any = any> =
   Nominal<string, Intent, Type>;


