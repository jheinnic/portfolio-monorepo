import {ImpliedType, ProviderToken} from '../../api/src/di';
import {IsType} from 'simplytyped';

export type IsImpliedType<TokenType extends ProviderToken<any>, Type> =
   IsType<ImpliedType<TokenType>, Type>
