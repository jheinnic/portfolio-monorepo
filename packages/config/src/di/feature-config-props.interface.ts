import {IModule, IModuleRegistry} from '@jchptf/nestjs';

export interface IFeatureConfigProps<Consumer extends IModule<IModuleRegistry>> extends IBaseConfigProps<Consumer>
{
   readonly loadConfigGlob: string;
   readonly resolveGlobRoot?: string;
}
