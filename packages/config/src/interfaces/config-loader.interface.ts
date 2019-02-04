import { ConstructorFor } from 'simplytyped';
import { IConfigFileReader } from './config-file-reader.interface';

export interface IConfigLoader
{
   loadInstance<T extends object>(
      configClass: ConstructorFor<T>, configReader: IConfigFileReader): T|undefined;
}
