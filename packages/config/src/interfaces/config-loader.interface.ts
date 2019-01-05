import {ConstructorFor} from 'simplytyped';

export interface IConfigLoader
{
   hasConfigMetadata<T extends object>(configClass: ConstructorFor<T>): boolean;

   loadInstance<T extends object>(configClass: ConstructorFor<T>/*, rootProperty?: string*/): T
}