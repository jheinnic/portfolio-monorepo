import { ConstructorFor } from 'simplytyped';
import { IConfigReader } from './config-file-reader.interface';

export interface IConfigLoader
{
   loadInstance<T extends object>(
      configClass: ConstructorFor<T>, configReader: IConfigReader): T|undefined;
}
