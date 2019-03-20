import { isKeyOf } from 'simplytyped';

import { InjectableKey } from './injectable-key.type';
import { ProviderToken } from './provider-token.type';

export function hasProviderToken<Type>(
   injectableKey: InjectableKey<Type>): injectableKey is ProviderToken<Type>
{
   return isKeyOf(injectableKey, 'provider');
}
