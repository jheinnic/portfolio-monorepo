import {ImpliedType, ProviderToken} from '../../src/di';
import {IsType} from 'simplytyped';

export type IsImpliedType<TokenType extends ProviderToken<any, string>, Type> =
   IsType<ImpliedType<TokenType>, Type>
