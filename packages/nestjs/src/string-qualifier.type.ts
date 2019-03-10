import { Nominal } from './nominal.type';

export type StringQualifier<Intent extends string, Type extends any = any> =
   Nominal<string, Intent, Type>;

export type ModuleIdentifier = StringQualifier<'ModuleIdentifier'>;

export type TypeIdentifier<T> = StringQualifier<'TypeIdentifier', T>;

export type DynamicModuleType = StringQualifier<'DynamicModuleType'>;

export type BaseProviderToken<Type, Modifier extends string = 'ProviderToken'> =
   StringQualifier<'ProviderToken' & Modifier, Type>;
