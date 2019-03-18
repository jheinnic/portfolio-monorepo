import { StringQualifier } from './string-qualifier.type';

export function getStringQualifier<Intent extends string>(
   name: string): StringQualifier<Intent>
{
   // if (name.indexOf(':') >= 0) {
   //    throw illegalArgs('Intent qualifiers may not include ":" characters.');
   // }

   return name as StringQualifier<Intent>;
}

export function getTypedStringQualifier<Intent extends string, Type>(
   name: string): StringQualifier<Intent, Type>
{
   // if (name.indexOf(':') >= 0) {
   //    throw illegalArgs('Intent qualifiers may not include ":" characters.');
   // }

   return name as StringQualifier<Intent, Type>;
}
