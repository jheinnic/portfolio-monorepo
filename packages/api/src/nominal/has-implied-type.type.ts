import { Extends } from '@jchptf/objecttypes';
import { ImpliedType } from './implied-type.type';
import { Nominal } from './nominal.type';

// export type HasImpliedType<Type, TokenType extends ProviderToken<any>> =
//    Extends<Type, ImpliedType<TokenType>>;

// export type NotHasImpliedType<TokenType extends ProviderToken<any>, Type> =
//    Not<Extends<Type, ImpliedType<TokenType>>>;

export type HasImpliedType<Type, NominalType extends Nominal<any, string, any>> =
   Extends<Type, ImpliedType<NominalType>>;
