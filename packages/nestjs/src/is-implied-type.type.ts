import { ImpliedType, ProviderToken } from '.';
import { IsExactly } from '@jchptf/objecttypes';

export type IsImpliedType<TokenType extends ProviderToken<any>, Type> =
   IsExactly<ImpliedType<TokenType>, Type>;
