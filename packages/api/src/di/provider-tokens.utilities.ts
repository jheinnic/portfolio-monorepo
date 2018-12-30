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
   DynamicProviderToken, ImpliedType, IntentQualifier, ModuleIdentifier, ProviderToken
} from './provider-tokens.interface';
import {illegalArgs} from '@thi.ng/errors';

export function provisionDynamicProviderToken<Name extends string, Source extends DynamicProviderToken<any, string>>(
   provisionIntentQualifier: Name
): ProviderToken<ImpliedType<Source>, Name>
{
   // if (factoryModuleName.indexOf(':') >= 0) {
   //    throw new Error(': is reserved as a separator and may not appear in a factory module\'s domain
   // name'); } if (factoryIntentName.indexOf(':') >= 0) { throw new Error(': is reserved as a separator
   // and may not appear in factory intent name'); } if (provisionModuleName.indexOf(':') >= 0) { throw new
   // Error(': is reserved as a separator and may not appear in provision module\'s domain name'); } if
   // (provisionQualifierName.indexOf(':') >= 0) { throw new Error(': is reserved as a separator and may
   // not appear in provision qualifier name'); }

   return `${provisionIntentQualifier}` as ProviderToken<ImpliedType<Source>, Name>;
}

export function getProviderToken<Type, Name extends string>(artifactName: Name): ProviderToken<Type, Name>
{
   // TODO: Assert a stronger positive condition rather than a weak negative condition...
   if (artifactName.indexOf(':') >= 0) {
      throw illegalArgs(`Provider token names may not include ":" characters.`);
   }

   return `${artifactName}` as ProviderToken<Type, Name>;
}

export function getGlobalProviderToken<Type, Name extends string>(
   moduleName: ModuleIdentifier, providerFQName: Name): ProviderToken<Type, Name>
{
   if (! providerFQName.startsWith(`${moduleName}::`)) {
      throw illegalArgs(`Global provider names require a module name prefix by convention.  Expected "${providerFQName}" to begin with "${moduleName}::"`);
   }
   return getProviderToken<Type, Name>(providerFQName);
}

export function getDynamicProviderToken<Type, Name extends string>(artifactName: Name): DynamicProviderToken<Type, Name>
{
   // TODO: Assert a stronger positive condition rather than a weak negative condition...
   if (artifactName.indexOf(':') >= 0) {
      throw illegalArgs(`Dynamic Provider token names may not include ":" characters.`);
   }

   return `${artifactName}` as DynamicProviderToken<Type, Name>;
}

export function getModuleIdentifier(moduleName: string): ModuleIdentifier
{
   if (moduleName.indexOf(':') >= 0) {
      throw illegalArgs(`Module identifiers may not include ":" characters.`);
   }

   return moduleName as ModuleIdentifier;
}

export function getIntentQualifier<Intent extends string>(name: string, intent: Intent): IntentQualifier<Intent>
{
   if (intent.indexOf(':') >= 0) {
      throw illegalArgs(`Intent types may not include ":" characters.`);
   }
   if (name.indexOf(':') >= 0) {
      throw illegalArgs(`Intent qualifiers may not include ":" characters.`);
   }

   return name as IntentQualifier<Intent>;
}
