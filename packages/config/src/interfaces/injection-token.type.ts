import {Nominal} from 'simplytyped';
import {IBagOf} from '@jchptf/api';

export type ModuleIdentifier = Nominal<string, 'ModuleIdentifier'>;

export type IntentQualifier = Nominal<'IntentQualifier', string>;

// @ts-ignore
type TypedToken<T extends any> = string & IntentQualifier;

export type ProviderToken<T extends any> =
   Nominal<string, 'ProviderToken'> & TypedToken<T>;

export type GlobalProviderToken<T extends any> =
   Nominal<string, 'GlobalProviderToken'> & ProviderToken<T>;

export type DynamicProviderToken<T extends any> =
   Nominal<string, 'DynamicProviderToken'> & TypedToken<T>;

export type TokenDictionary<P extends IntentQualifier = IntentQualifier, D extends IBagOf<any, P> = IBagOf<any, P>> = {
   [K in P]: K & ProviderToken<D[K]>
};
