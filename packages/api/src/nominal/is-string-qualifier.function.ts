import { StringQualifier } from './string-qualifier.type';

export function isStringQualifier<Intent extends string>(
   _name: string): _name is StringQualifier<Intent>
{
   return true;
}
