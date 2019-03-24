import { illegalArgs } from '@thi.ng/errors';

import { GlobalProviderToken, LocalProviderToken, ProviderToken } from './provider-token.type';
import { ModuleIdentifier } from './module-identifier.type';

export function isLocalProviderToken<Component extends {}, ModuleId extends ModuleIdentifier>(
   _token: symbol|string): _token is LocalProviderToken<Component, ModuleId>
{
   return true;
}

export function blessLocalProviderToken<Component extends {}, ModuleId extends ModuleIdentifier>(
   token: symbol|string): LocalProviderToken<Component, ModuleId>
{
   if (isLocalProviderToken<Component, ModuleId>(token)) {
      return token;
   }

   return undefined as never;
}

export function getLocalProviderTokenString<Component, ModuleId extends ModuleIdentifier>(
   moduleId: ModuleId, typeId: string, qualifier?: string,
): ProviderToken<Component>
{
   return blessLocalProviderToken<Component, ModuleId>(
      appendQualifier(`${moduleId.toString()}::${typeId}`, qualifier),
   );
}

export function getLocalProviderTokenSymbol<Component, ModuleId extends ModuleIdentifier>(
   moduleId: ModuleId, typeId: string, qualifier?: string,
): ProviderToken<Component>
{
   return blessLocalProviderToken<Component, ModuleId>(
      Symbol(
         appendQualifier(`${moduleId.toString()}::${typeId}`, qualifier),
      ),
   );
}

export function isGlobalProviderToken<Component extends {}>(
   _token: symbol|string): _token is GlobalProviderToken<Component>
{
   return true;
}

export function blessGlobalProviderToken<Component extends {}>(
   _token: symbol|string): GlobalProviderToken<Component>
{
   if (isGlobalProviderToken<Component>(_token)) {
      return _token;
   }

   return undefined as never;
}

export function getGlobalProviderTokenString<Component>(
   moduleId: ModuleIdentifier, typeId: string, qualifier?: string,
): ProviderToken<Component>
{
   return blessGlobalProviderToken<Component>(
      appendQualifier(`Global::${moduleId.toString()}::${typeId}`, qualifier),
   );
}

export function getGlobalProviderTokenSymbol<Component>(
   moduleId: ModuleIdentifier, typeId: string, qualifier?: string,
): ProviderToken<Component>
{
   return blessGlobalProviderToken<Component>(
      Symbol(
         appendQualifier(`Global::${moduleId.toString()}::${typeId}`, qualifier),
      ),
   );
}

function appendQualifier(tokenStr: string, qualifier?: string)
{
   if (!! qualifier) {
      // TODO: Assert a stronger positive condition rather than a weak negative condition...
      if (qualifier.indexOf(':') >= 0) {
         throw illegalArgs('Provider token qualifiers may not include ":" characters.');
      }

      return `${tokenStr}(${qualifier})`;
   }

   return tokenStr;
}

// export function getModuleIdentifier(moduleName: string): ModuleIdentifier
// {
//    if (moduleName.indexOf(':') >= 0) {
//       throw illegalArgs('Module identifiers may not include ":" characters.');
//    }
//
//    if (isStringQualifier<'ModuleIdentifier'>(moduleName)) {
//       return moduleName;
//    }
//    // const moduleId = Symbol(moduleName);
//    // if (isSymbolQualifier<'ModuleIdentifier'>(moduleId)) {
//    //    return moduleId;
//    // }
//
//    return moduleName as never;
// }
