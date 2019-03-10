import { ImpliedType, Nominal } from '.';
import { IsExactly } from '@jchptf/objecttypes';

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