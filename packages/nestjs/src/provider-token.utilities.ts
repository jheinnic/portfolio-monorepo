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
 * Factory module implementors will likely want to expose this method through a method in
 * their own public API in order to avoid its necessarily generic/reflective argument names,
 * For example, a TypeORM module that accepts configuration extensions to crate multiple
 * different Connections and uses those to access multiple different Entity repository types
 * will likely supply a pair of methods for each of those two abstractions--one for the
 * consumer's input configuration, and another for its output artifact.  Which of those four
 * methods is called will determine what value is passed to this method's "baseType"
 * identifier, and the end consumer's input will drive the value of the second qualifying
 * argument.
 *
 * @param base
 */
import { illegalArgs } from '@thi.ng/errors';
import { ModuleIdentifier, StringQualifier, TypeIdentifier } from './string-qualifier.type';
import { DynamicModuleType } from './string-qualifier.type';
import {
   DynamicProviderToken, GlobalProviderToken, LocalProviderToken,
} from './provider-token.type';

export function getDynamicProviderToken<Type>(
   moduleId: ModuleIdentifier, binding: DynamicModuleType, typeId: TypeIdentifier<Type>,
   tagName?: string,
): DynamicProviderToken<Type>
{
   // if (factoryModuleName.indexOf(':') >= 0) {
   //    throw new Error(': is reserved as a separator and may not appear in a factory module\'s
   // domain name'); } if (factoryIntentName.indexOf(':') >= 0) { throw new Error(': is reserved as
   // a separator and may not appear in factory intent name'); } if
   // (provisionModuleName.indexOf(':') >= 0) { throw new Error(': is reserved as a separator and
   // may not appear in provision module\'s domain name'); } if
   // (provisionQualifierName.indexOf(':') >= 0) { throw new Error(': is reserved as a separator
   // and may not appear in provision qualifier name'); }
   if (!!tagName) {
      return `${moduleId}::${binding}::${typeId}(${tagName})` as DynamicProviderToken<Type>;
   }

   return `${moduleId}::${binding}::${typeId}` as DynamicProviderToken<Type>;
}

export function getLocalProviderToken<Type>(
   moduleId: ModuleIdentifier, typeId: TypeIdentifier<Type>,
   tagName?: string,
): LocalProviderToken<Type>
{
   if (!!tagName) {
      // TODO: Assert a stronger positive condition rather than a weak negative condition...
      if (tagName.indexOf(':') >= 0) {
         throw illegalArgs('Provider token role tags may not include ":" characters.');
      }

      return `${moduleId}::${typeId}(${tagName})` as LocalProviderToken<Type>;
   }
   return `${moduleId}::${typeId}` as LocalProviderToken<Type>;
}

export function getGlobalProviderToken<Type>(
   typeId: TypeIdentifier<Type>, tagName?: string): GlobalProviderToken<Type>
{
   if (!!tagName) {
      // TODO: Assert a stronger positive condition rather than a weak negative condition...
      if (tagName.indexOf(':') >= 0) {
         throw illegalArgs('Provider token role tags may not include ":" characters.');
      }

      return `${typeId}(${tagName})` as GlobalProviderToken<Type>;
   }

   return `${typeId}` as GlobalProviderToken<Type>;
}

export function getModuleIdentifier(moduleName: string): ModuleIdentifier
{
   if (moduleName.indexOf(':') >= 0) {
      throw illegalArgs('Module identifiers may not include ":" characters.');
   }

   // return moduleName as ModuleIdentifier;
   return getStringQualifier(moduleName, 'ModuleIdentifier') as ModuleIdentifier;
}

export function getNamedTypeIntent<Type>(typeId: string): TypeIdentifier<Type>
{
   return getTypedStringQualifier<'TypeIdentifier', Type>(
      typeId, 'TypeIdentifier') as TypeIdentifier<Type>;
}

export function getNamedSubtypeIntent<Type, Subtype extends Type>(
   subtypeId: string): TypeIdentifier<Type>
{
   return getTypedStringQualifier<'TypeIdentifier', Subtype>(
      subtypeId, 'TypeIdentifier') as TypeIdentifier<Subtype>;
}

export function getDynamicModuleType(
   moduleId: ModuleIdentifier, tagName?: string): DynamicModuleType
{
   if (!!tagName) {
      return getStringQualifier<'DynamicModuleType'>(
         `${moduleId}(${tagName})`, 'DynamicModuleType') as DynamicModuleType;
   }

   return getStringQualifier<'DynamicModuleType'>(
      moduleId, 'DynamicModuleType') as DynamicModuleType;
}

function getStringQualifier<Intent extends string>(
   name: string, intent: Intent): StringQualifier<Intent>
{
   if (intent.indexOf(':') >= 0) {
      throw illegalArgs('Intent types may not include ":" characters.');
   }
   if (name.indexOf(':') >= 0) {
      throw illegalArgs('Intent qualifiers may not include ":" characters.');
   }

   return `${name}` as StringQualifier<Intent>;
}

function getTypedStringQualifier<Intent extends string, Type>(
   name: string, intent: Intent): StringQualifier<Intent, Type>
{
   if (intent.indexOf(':') >= 0) {
      throw illegalArgs('Intent types may not include ":" characters.');
   }
   if (name.indexOf(':') >= 0) {
      throw illegalArgs('Intent qualifiers may not include ":" characters.');
   }

   return `${name}` as StringQualifier<Intent, Type>;
}
