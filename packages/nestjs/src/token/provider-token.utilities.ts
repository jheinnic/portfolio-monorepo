import { illegalArgs } from '@thi.ng/errors';

import {
   isStringQualifier, isTypedStringQualifier, isTypedSymbolQualifier,
} from '@jchptf/api';
import {
   DynamicProviderToken, GlobalProviderToken, LocalProviderToken,
} from './provider-token.type';
import { DynamicModuleKind } from './dynamic-module-kind.type';
import { ModuleIdentifier } from './module-identifier.type';

/**
 * @deprecated
 * @param moduleId
 * @param binding
 * @param typeId
 * @param qualifier
 */
export function getDynamicProviderToken<Component>(
   moduleId: ModuleIdentifier,
   binding: DynamicModuleKind,
   typeId: string,
   qualifier?: string,
): DynamicProviderToken<Component>
{
   const tokenStr = appendQualifier(`${moduleId.toString()}::${binding}::${typeId}`, qualifier);
   if (isTypedStringQualifier<'Local' & 'Dynamic' & 'ProviderToken', Component>(tokenStr)) {
      return tokenStr;
   }

   return tokenStr as never;
}

export function getLocalProviderToken<Component>(
   moduleId: ModuleIdentifier, typeId: string, qualifier?: string,
): LocalProviderToken<Component>
{
   const tokenStr = appendQualifier(`${moduleId.toString()}::${typeId}`, qualifier);
   if (isTypedStringQualifier<'Local' & 'ProviderToken', Component>(tokenStr)) {
      return tokenStr;
   }

   return tokenStr as never;
}

export function getLocalProviderSymbol<Component>(
   moduleId: ModuleIdentifier, typeId: string, qualifier?: string,
): LocalProviderToken<Component>
{
   const tokenSym = Symbol(appendQualifier(`${moduleId.toString()}::${typeId}`, qualifier));
   if (isTypedSymbolQualifier<'Local' & 'ProviderToken', Component>(tokenSym)) {
      return tokenSym;
   }

   return tokenSym as never;
}

export function getGlobalProviderToken<Component>(
   moduleId: ModuleIdentifier, typeId: string, qualifier?: string,
): GlobalProviderToken<Component>
{
   const tokenStr = appendQualifier(`${moduleId.toString()}::${typeId}`, qualifier);
   if (isTypedStringQualifier<'Global' & 'ProviderToken', Component>(tokenStr)) {
      return tokenStr;
   }

   return tokenStr as never;
}

export function getGlobalProviderSymbol<Component>(
   moduleId: ModuleIdentifier, typeId: string, qualifier?: string,
): GlobalProviderToken<Component>
{
   const tokenSym = Symbol(appendQualifier(`${moduleId.toString()}::${typeId}`, qualifier));
   if (isTypedSymbolQualifier<'Global' & 'ProviderToken', Component>(tokenSym)) {
      return tokenSym;
   }

   return tokenSym as never;
}

export function getModuleIdentifier(moduleName: string): ModuleIdentifier
{
   if (moduleName.indexOf(':') >= 0) {
      throw illegalArgs('Module identifiers may not include ":" characters.');
   }

   if (isStringQualifier<'ModuleIdentifier'>(moduleName)) {
      return moduleName;
   }
   // const moduleId = Symbol(moduleName);
   // if (isSymbolQualifier<'ModuleIdentifier'>(moduleId)) {
   //    return moduleId;
   // }

   return moduleName as never;
}

function appendQualifier(tokenStr: string, qualifier?: string)
{
   if (!!qualifier) {
      // TODO: Assert a stronger positive condition rather than a weak negative condition...
      if (qualifier.indexOf(':') >= 0) {
         throw illegalArgs('Provider token qualifiers may not include ":" characters.');
      }

      return `${tokenStr}(${qualifier})`;
   }

   return tokenStr;
}

// /**
//  * @deprecated
//  * @param typeId
//  */
// export function getNamedTypeIntent<Type>(typeId: string): TypeIdentifier<Type>
// {
//    return isTypedStringQualifier<'TypeIdentifier', Type>(typeId) as TypeIdentifier<Type>;
// }
//
// /**
//  * @deprecated
//  * @param subtypeId
//  */
// export function getNamedSubtypeIntent<Type, Subtype extends Type>(
//    subtypeId: string): TypeIdentifier<Type>
// {
//    return isTypedStringQualifier<'TypeIdentifier', Subtype>(
//       subtypeId) as TypeIdentifier<Subtype>;
// }

/**
 * A utility function for dynamic modules that need a deterministic way of agreeing on a
 * pair of token identifier names, given only the consumer's module providing a name
 * chosen from its own namespace paired with the identifier set by the factory module
 * that matches the consuming module's intended output artifact.
 *
 * As long as both modules use fully qualified names, maintain uniqueness of those FQN's
 * "local" short name, and every module has a unique base domain name, a deterministic and
 * consistent protocol for concatenating any such pair of names can be guaranteed to be
 * globally unique.
 *
 * IFactory module implementors will likely want to expose this method through a method in
 * their own public API in order to avoid its necessarily generic/reflective argument names,
 * For example, a TypeORM module that accepts configuration extensions to crate multiple
 * different Connections and uses those to access multiple different Entity repository types
 * will likely supply a pair of methods for each of those two abstractions--one for the
 * consumer's input configuration, and another for its output artifact.  Which of those four
 * methods is called will determine what value is passed to this method's "baseType"
 * identifier, and the end consumer's input will drive the value of the second qualifying
 * argument.
 *
 * @deprecated
 * @param moduleId
 * @param qualifier
 */
export function getDynamicModuleKind(
   moduleId: ModuleIdentifier, qualifier?: string): DynamicModuleKind
{
   const retVal = appendQualifier(moduleId.toString(), qualifier);
   if (isStringQualifier<'DynamicModuleKind'>(retVal)) {
      return retVal;
   }

   return retVal as never;
}
