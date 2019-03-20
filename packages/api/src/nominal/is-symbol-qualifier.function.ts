import { SymbolQualifier } from './symbol-qualifier.type';

export function isSymbolQualifier<Intent extends string>(
   _name: symbol): _name is SymbolQualifier<Intent>
{
   return true;
}
