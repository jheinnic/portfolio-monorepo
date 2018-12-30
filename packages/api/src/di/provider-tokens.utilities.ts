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
import {
   DynamicProviderToken, GlobalProviderToken, IntentQualifier, LocalProviderToken,
   ModuleIdentifier, DynamicProviderBinding, TypeIdentifier
} from './provider-tokens.interface';
import {illegalArgs} from '@thi.ng/errors';

export function getDynamicProviderToken<Type>(
   moduleId: ModuleIdentifier, binding: DynamicProviderBinding, typeId: TypeIdentifier<Type>, tagName?: string
): DynamicProviderToken<Type>
{
   // if (factoryModuleName.indexOf(':') >= 0) {
   //    throw new Error(': is reserved as a separator and may not appear in a factory module\'s domain
   // name'); } if (factoryIntentName.indexOf(':') >= 0) { throw new Error(': is reserved as a separator
   // and may not appear in factory intent name'); } if (provisionModuleName.indexOf(':') >= 0) { throw new
   // Error(': is reserved as a separator and may not appear in provision module\'s domain name'); } if
   // (provisionQualifierName.indexOf(':') >= 0) { throw new Error(': is reserved as a separator and may
   // not appear in provision qualifier name'); }
   if (!! tagName) {
      return `${moduleId}::${binding}::${typeId}(${tagName})` as DynamicProviderToken<Type>
   }

   return `${moduleId}::${binding}::${typeId}` as DynamicProviderToken<Type>
}

export function getLocalProviderToken<Type>(moduleId: ModuleIdentifier, typeId: TypeIdentifier<Type>, tagName?: string): LocalProviderToken<Type>
{
   if (!! tagName) {
      // TODO: Assert a stronger positive condition rather than a weak negative condition...
      if (tagName.indexOf(':') >= 0) {
         throw illegalArgs(`Provider token role tags may not include ":" characters.`);
      }

      return `${moduleId}::${typeId}(${tagName})` as LocalProviderToken<Type>;
   }
   return `${moduleId}::${typeId}` as LocalProviderToken<Type>;
}

export function getGlobalProviderToken<Type>(typeId: TypeIdentifier<Type>, tagName?: string): GlobalProviderToken<Type>
{
   if (!! tagName) {
      // TODO: Assert a stronger positive condition rather than a weak negative condition...
      if (tagName.indexOf(':') >= 0) {
         throw illegalArgs(`Provider token role tags may not include ":" characters.`);
      }

      return `${typeId}(${tagName})` as LocalProviderToken<Type>;
   }

   return `${typeId}` as GlobalProviderToken<Type>;
}

export function getModuleIdentifier(moduleName: string): ModuleIdentifier
{
   if (moduleName.indexOf(':') >= 0) {
      throw illegalArgs(`Module identifiers may not include ":" characters.`);
   }

   // return moduleName as ModuleIdentifier;
   return getIntentQualifier(moduleName, 'ModuleIdentifier') as ModuleIdentifier;
}

export function getNamedTypeIntent<Type>(typeId: string): TypeIdentifier<Type> {
   return getTypedIntentQualifier<'TypeIdentifier', Type>(typeId, 'TypeIdentifier') as TypeIdentifier<Type>;
}

export function getNamedSubtypeIntent<Type, Subtype extends Type>(typeId: TypeIdentifier<Type>): TypeIdentifier<Subtype> {
   return getTypedIntentQualifier<'TypeIdentifier', Subtype>(typeId, 'TypeIdentifier') as TypeIdentifier<Subtype>;
}

export function getDynamicProviderBinding(moduleId: ModuleIdentifier, tagName?: string): DynamicProviderBinding
{
   if (!! tagName) {
      return getIntentQualifier<'DynamicProviderBinding'>(`${moduleId}(${tagName})`, 'DynamicProviderBinding') as DynamicProviderBinding;
   }

   return getIntentQualifier<'DynamicProviderBinding'>(moduleId, 'DynamicProviderBinding') as DynamicProviderBinding;
}

function getIntentQualifier<Intent extends string>(name: string, intent: Intent): IntentQualifier<Intent>
{
   if (intent.indexOf(':') >= 0) {
      throw illegalArgs(`Intent types may not include ":" characters.`);
   }
   if (name.indexOf(':') >= 0) {
      throw illegalArgs(`Intent qualifiers may not include ":" characters.`);
   }

   return `${name}` as IntentQualifier<Intent>;
}

function getTypedIntentQualifier<Intent extends string, Type>(name: string, intent: Intent): IntentQualifier<Intent, Type>
{
   if (intent.indexOf(':') >= 0) {
      throw illegalArgs(`Intent types may not include ":" characters.`);
   }
   if (name.indexOf(':') >= 0) {
      throw illegalArgs(`Intent qualifiers may not include ":" characters.`);
   }

   return `${name}` as IntentQualifier<Intent, Type>;
}
