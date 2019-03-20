import { Nominal } from './nominal.type';

export type SymbolQualifier<Intent extends string, Type extends any = any> =
   Nominal<symbol, Intent, Type>;
