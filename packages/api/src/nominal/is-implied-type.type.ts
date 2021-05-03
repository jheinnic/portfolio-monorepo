import { IsExactly } from '@jchptf/objecttypes';
import { ImpliedType } from './implied-type.type';
import { Nominal } from './nominal.type';

// export type IsImpliedType<Type, TokenType extends ProviderToken<any>> =
//    IsExactly<Type, ImpliedType<TokenType>>;

export type IsImpliedType<Type, NominalType extends Nominal<any, string, any>> =
   IsExactly<Type, ImpliedType<NominalType>>;

// export type IsImpliedTypeBad<Type, NominalType extends Nominal<any, string, any>> =
//    IsExactly<ImpliedType<NominalType>, Type>;

// export type RevIsImpliedTypeGen<Type, NominalType extends Nominal<any, string, any>> =
//    IsExactly<ImpliedType<NominalType>, Type>;

// export type RevIsImpliedTypeRev<Type, NominalType extends Nominal<any, string, any>> =
//    IsExactly<Type, ImpliedType<NominalType>>;
