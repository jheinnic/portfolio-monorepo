import { GlobalProviderToken, LocalProviderToken } from './provider-token.type';
import { IModule } from '../module';
import { Zoo } from '../../types/exploreSymbols.spec';
import { MY_MODULE_ID } from '../../build/fixtures/names.constants';

export function isLocalProviderToken
   <Component, Module extends IModule, Token>(_token: Token, _module: Module):
      _token is LocalProviderToken<Component, Module, Token>
{
   return true;
}

export function blessLocalProviderToken
   <Component, Module extends IModule, Token extends symbol>(token: Token, module: Module):
      LocalProviderToken<Component, Module, symbol>
{
   const symbolic = token as symbol;
   if (isLocalProviderToken<Component, Module, symbol>(symbolic, module)) {
      return symbolic;
   }

   return undefined as never;
}

export function isGlobalProviderToken<Component, Token extends symbol|string>(_token: Token):
   _token is GlobalProviderToken<Component, Token>
{
   return true;
}

export function blessGlobalProviderSymbol
   <Component, Token extends symbol>(token: Token):
      GlobalProviderToken<Component, symbol>
{
   const symbolic = token as symbol;
   if (isGlobalProviderToken<Component, symbol>(symbolic)) {
      return symbolic;
   }

   return undefined as never;
}

export function prepareModule<ForScope extends IModule, ForTypeMap extends IModule = ForScope>(
   localScope: ForScope)
{
   function blessSymbol<Token extends keyof ForTypeMap>(uniqueKey: Token)
   {
      const symbolic = uniqueKey as symbol;
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
ope
ocalScope
     localScope
localScope
pe
calScope
    localScope
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
e
      pocSlacol     lScopelocalScopelocalScopelocalScopelocalScopelocalScopelocalScopelocalScopelocalScopelocalScopelocalScopelocalScopelocalScopelocalScope
      return undefined as never;
   }

   return blessSymbol;
}
