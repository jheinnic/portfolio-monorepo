import {ConstructorFor} from 'simplytyped';
import {ProviderToken} from './injection-token.type';

export interface IConfigurationFactory {
   getProviderToken <T extends object>(cons: ConstructorFor<T>): ProviderToken<T>|undefined;

   hasConfigMetadata <T extends object>(cons: ConstructorFor<T>): boolean;

   hasProviderToken<T extends object>(cons: ConstructorFor<T>): boolean;

   loadInstance <T extends object>(cons: ConstructorFor<T>): T
}