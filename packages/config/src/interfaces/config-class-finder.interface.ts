import { Observable } from 'rxjs';
import { IBoundDynamicModuleImport, IModule } from '@jchptf/nestjs';
import { ConfigModuleId } from '../di';

export interface IConfigClassFinder<Consumer extends IModule>
{
   loadConfigAsync(): Observable<IBoundDynamicModuleImport<any, ConfigModuleId, Consumer>>;

   loadConfigSync(): Observable<IBoundDynamicModuleImport<any, ConfigModuleId, Consumer>>;
}
