import {ConstructorFor} from 'simplytyped';
import {ProviderToken} from '@jchptf/api';
import {IConfigLoader} from './config-loader.interface';

export interface IConfigProviderFactory extends IConfigLoader {
   getProviderToken <T extends object>(cons: ConstructorFor<T>): ProviderToken<T>;

   hasProviderToken<T extends object>(cons: ConstructorFor<T>): boolean;
}