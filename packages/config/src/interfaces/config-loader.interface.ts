import { ConstructorFor } from 'simplytyped';
import { IConfigReader } from './config-reader.interface';

export interface IConfigLoader
{
   loadInstance<T extends object>(
      configClass: ConstructorFor<T>, configReader: IConfigReader): T|undefined;
}
