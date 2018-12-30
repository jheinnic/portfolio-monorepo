import {ImpliedType, ProviderToken} from '../../src/di';
import {IsType} from 'simplytyped';

export type IsImpliedType<TokenType extends ProviderToken<any>, Type> =
   IsType<ImpliedType<TokenType>, Type>
