import { StringKeys } from 'simplytyped';
import { ProviderToken } from './provider-token.type';

export type TokenDictionary<Local extends object> = {
   [K in StringKeys<Local>]: ProviderToken<Local[K]>
};