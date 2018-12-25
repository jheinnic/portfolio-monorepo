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
   GlobalProviderToken, ProviderToken, IntentQualifier, ModuleIdentifier, DynamicProviderToken
} from './interfaces/injection-token.type';

export function provisionDynamicProviderToken<T>(
   dynamicProviderToken: DynamicProviderToken<T>, provisionIntentQualifier: IntentQualifier
): ProviderToken<T>
{
   // if (factoryModuleName.indexOf(':') >= 0) {
   //    throw new Error(': is reserved as a separator and may not appear in a factory module\'s domain name');
   // }
   // if (factoryIntentName.indexOf(':') >= 0) {
   //    throw new Error(': is reserved as a separator and may not appear in factory intent name');
   // }
   // if (provisionModuleName.indexOf(':') >= 0) {
   //    throw new Error(': is reserved as a separator and may not appear in provision module\'s domain name');
   // }
   // if (provisionQualifierName.indexOf(':') >= 0) {
   //    throw new Error(': is reserved as a separator and may not appear in provision qualifier name');
   // }

   return `${dynamicProviderToken}::${provisionIntentQualifier}` as ProviderToken<T>;
}

export function getLocalProviderToken<T>(artifactName: string): ProviderToken<T>
{
   if (artifactName.indexOf(':') >= 0) {
      throw new Error();
   }

   return `${artifactName}` as ProviderToken<T>;
}

export function getGlobalProviderToken<T>(
   moduleName: ModuleIdentifier, intentQualifier: IntentQualifier): GlobalProviderToken<T>
{
   return `${moduleName}::${intentQualifier}` as GlobalProviderToken<T>;
}

export function getDynamicProviderToken<T>(
   moduleName: ModuleIdentifier, intentQualifier: IntentQualifier): DynamicProviderToken<T>
{
   return `${moduleName}::${intentQualifier}` as GlobalProviderToken<T>;
}

export function getModuleIdentifier(moduleName: string): ModuleIdentifier {
   if (moduleName.indexOf(':') >= 0) {
      throw new Error();
   }

   return moduleName as ModuleIdentifier;
}

export function getIntentQualifier(intentQualifier: string): IntentQualifier {
   if (intentQualifier.indexOf(':') >= 0) {
      throw new Error();
   }

   return intentQualifier as IntentQualifier;
}
