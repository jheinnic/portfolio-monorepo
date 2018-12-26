import {ConstructorFor} from 'simplytyped';
import {ProviderToken} from '@jchptf/api';

export interface IConfigurationFactory {
   getProviderToken <T extends object>(cons: ConstructorFor<T>): ProviderToken<T>;

   hasConfigMetadata <T extends object>(cons: ConstructorFor<T>): boolean;

   hasProviderToken<T extends object>(cons: ConstructorFor<T>): boolean;

   loadInstance <T extends object>(cons: ConstructorFor<T>): T
}