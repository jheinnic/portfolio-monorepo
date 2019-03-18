import { illegalArgs } from '@thi.ng/errors';

import { getStringQualifier, getTypedStringQualifier } from '@jchptf/api';
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
   // if (factoryModuleName.indexOf(':') >= 0) {
   //    throw new Error(': is reserved as a separator and may not appear in a factory module\'s
   // domain name'); } if (factoryIntentName.indexOf(':') >= 0) { throw new Error(': is reserved as
   // a separator and may not appear in factory intent name'); } if
   // (provisionModuleName.indexOf(':') >= 0) { throw new Error(': is reserved as a separator and
   // may not appear in provision module\'s domain name'); } if
   // (provisionQualifierName.indexOf(':') >= 0) { throw new Error(': is reserved as a separator
   // and may not appear in provision qualifier name'); }
   const tokenStr = appendQualifier(`${moduleId}::${binding}::${typeId}`, qualifier);

   return tokenStr as DynamicProviderToken<Component>;
}

export function getLocalProviderToken<Component>(
   typeId: string, qualifier?: string,
): LocalProviderToken<Component>
{
   return getTypedStringQualifier<'Local' & 'ProviderToken', Component>(
      appendQualifier(typeId, qualifier),
   ) as LocalProviderToken<Component>;
}

export function getGlobalProviderToken<Component>(
   moduleId: ModuleIdentifier, typeId: string, qualifier?: string,
): GlobalProviderToken<Component>
{
   return getTypedStringQualifier<'Global' & 'ProviderToken', Component>(
      appendQualifier(`${moduleId}::${typeId}`, qualifier),
   ) as GlobalProviderToken<Component>;
}

export function getModuleIdentifier(moduleId: string): ModuleIdentifier
{
   if (moduleId.indexOf(':') >= 0) {
      throw illegalArgs('Module identifiers may not include ":" characters.');
   }

   return getStringQualifier<'ModuleIdentifier'>(moduleId) as ModuleIdentifier;
}

function appendQualifier(tokenStr: string, qualifier?: string)
{
   if (!!qualifier) {
      // TODO: Assert a stronger positive condition rather than a weak negative condition...
      if (qualifier.indexOf(':') >= 0) {
         throw illegalArgs('Provider token role tags may not include ":" characters.');
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
//    return getTypedStringQualifier<'TypeIdentifier', Type>(typeId) as TypeIdentifier<Type>;
// }
//
// /**
//  * @deprecated
//  * @param subtypeId
//  */
// export function getNamedSubtypeIntent<Type, Subtype extends Type>(
//    subtypeId: string): TypeIdentifier<Type>
// {
//    return getTypedStringQualifier<'TypeIdentifier', Subtype>(subtypeId) as TypeIdentifier<Subtype>;
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
 * @param moduleId
 * @param qualifier
 */
export function getDynamicModuleKind(
   moduleId: ModuleIdentifier, qualifier?: string): DynamicModuleKind
{
   return getStringQualifier<'DynamicModuleKind'>(
       appendQualifier(moduleId, qualifier)) as DynamicModuleKind;
}
