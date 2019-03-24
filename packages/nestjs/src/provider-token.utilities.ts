import { GlobalProviderToken, IModule, LocalProviderToken } from './provider-token.type';

export function isLocalProviderToken<Component extends {}, Module extends IModule>(
   _token: string|symbol, _module: Module): _token is LocalProviderToken<Component, Module>
{
   return true;
}

export function blessLocalProviderToken<Component extends {}, Module extends IModule>(
   token: string|symbol, module: Module): LocalProviderToken<Component, Module>
{
   if (isLocalProviderToken<Component, Module>(token, module)) {
      return token;
   }

   return undefined as never;
}

export function isGlobalProviderToken<Component extends {}>(
   _token: string|symbol): _token is GlobalProviderToken<Component>
{
   return true;
}

export function blessGlobalProviderToken<Component extends {}>(
   token: string|symbol): GlobalProviderToken<Component>
{
   if (isGlobalProviderToken<Component>(token)) {
      return token;
   }

   return undefined as never;
}

// export function getLocalProviderTokenString
// <Component extends {}, ModuleId extends ModuleIdentifier>(
//    moduleId: ModuleId, typeId: string, qualifier?: string,
// ): LocalProviderToken<Component, ModuleId, string>
// {
//    return blessLocalProviderToken<Component, ModuleId, string>(
//       appendQualifier(`${moduleId.toString()}::${typeId}`, qualifier),
//    );
// }
//
// export function getLocalProviderTokenSymbol<Component, ModuleId extends ModuleIdentifier>(
//    moduleId: ModuleId, typeId: string, qualifier?: string,
// ): LocalProviderToken<Component, ModuleId, symbol>
// {
//    return blessLocalProviderToken<Component, ModuleId, symbol>(
//       Symbol(
//          appendQualifier(`${moduleId.toString()}::${typeId}`, qualifier),
//       ),
//    );
// }

// export function getGlobalProviderTokenString<Component>(
//    moduleId: ModuleIdentifier, typeId: string, qualifier?: string,
// ): GlobalProviderToken<Component, string>
// {
//    return blessGlobalProviderToken<Component, string>(
//       appendQualifier(`Global::${moduleId.toString()}::${typeId}`, qualifier),
//    );
// }
//
// export function getGlobalProviderTokenSymbol<Component>(
//    moduleId: ModuleIdentifier, typeId: string, qualifier?: string,
// ): GlobalProviderToken<Component, symbol>
// {
//    return blessGlobalProviderToken<Component, symbol>(
//       Symbol(
//          appendQualifier(`Global::${moduleId.toString()}::${typeId}`, qualifier),
//       ),
//    );
// }

// function appendQualifier(tokenStr: string, qualifier?: string)
// {
//    if (!! qualifier) {
//       // TODO: Assert a stronger positive condition rather than a weak negative condition...
//       if (qualifier.indexOf(':') >= 0) {
//          throw illegalArgs('Provider token qualifiers may not include ":" characters.');
//       }
//
//       return `${tokenStr}(${qualifier})`;
//    }
//
//    return tokenStr;
// }

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
