import {Nominal} from 'simplytyped';
import {IBagOf} from '../api';

export type ModuleIdentifier = Nominal<string, 'ModuleIdentifier'>;

export type IntentQualifier = Nominal<'IntentQualifier', string>;

// T exists only to express compatibility with token's injected artifact, but
// TypeScript expects the generic to be used in the type alias expansion itself,
// so we apply a vacuous tautology here to satisfy the compiler.  Despite use of
// a conditional expression, this type will only ever be 'string & IntentQualifier'.
export type TypedToken<T extends any> = T extends any ? (string & IntentQualifier) : T;

export type ProviderToken<T extends any> =
   Nominal<string, 'ProviderToken'> & TypedToken<T>;

export type GlobalProviderToken<T extends any> =
   Nominal<string, 'GlobalProviderToken'> & ProviderToken<T>;

export type DynamicProviderToken<T extends any> =
   Nominal<string, 'DynamicProviderToken'> & TypedToken<T>;

export type TokenDictionary<P extends IntentQualifier = IntentQualifier, D extends IBagOf<any, P> = IBagOf<any, P>> = {
   [K in P]: K & ProviderToken<D[K]>
};
