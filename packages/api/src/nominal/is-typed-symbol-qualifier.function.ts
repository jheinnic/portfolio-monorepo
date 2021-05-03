import { SymbolQualifier } from './symbol-qualifier.type';

export function isTypedSymbolQualifier<Intent extends string, Type>(
   _name: symbol): _name is SymbolQualifier<Intent, Type> {
   return true;
}
