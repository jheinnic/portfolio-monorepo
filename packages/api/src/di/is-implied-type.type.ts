import { ImpliedType, ProviderToken } from '.';
import { HasType, IsExactType, NotHasType } from 'conditional-type-checks';

export type IsImpliedType<TokenType extends ProviderToken<any>, Type> =
   IsExactType<ImpliedType<TokenType>, Type>;

export type HasImpliedType<TokenType extends ProviderToken<any>, Type> =
   HasType<Type, ImpliedType<TokenType>>;

export type NotHasImpliedType<TokenType extends ProviderToken<any>, Type> =
   NotHasType<Type, ImpliedType<TokenType>>;
