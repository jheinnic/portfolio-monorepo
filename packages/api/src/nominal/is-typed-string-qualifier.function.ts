import { StringQualifier } from './string-qualifier.type';

export function isTypedStringQualifier<Intent extends string, Type>(
   _name: string): _name is StringQualifier<Intent, Type>
{
   return true;
}
