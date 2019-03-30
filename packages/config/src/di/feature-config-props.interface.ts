import { IBaseConfigProps, IModule } from '@jchptf/nestjs';

export interface IFeatureConfigProps<Consumer extends IModule> extends IBaseConfigProps<Consumer>
{
   readonly loadConfigGlob: string;
   readonly resolveGlobRoot?: string;
}
