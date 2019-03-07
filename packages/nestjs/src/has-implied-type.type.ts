import { Extends } from '@jchptf/objecttypes';
import { ImpliedType } from './implied-type.type';
import { ProviderToken } from './provider-token.type';

export type HasImpliedType<TokenType extends ProviderToken<any>, Type> =
   Extends<Type, ImpliedType<TokenType>>;

// export type NotHasImpliedType<TokenType extends ProviderToken<any>, Type> =
//    Not<Extends<Type, ImpliedType<TokenType>>>;