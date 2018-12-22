import {ConstructorFor} from 'simplytyped';

export interface IConfigLoader {
   getConfig<T extends object>(configClass: ConstructorFor<T>, rootPath?: string): T
}