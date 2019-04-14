import { IModule } from '../module';
import { LocalProviderToken } from '../provider';

export interface IBoundDynamicModuleExport <
   ParamType extends {},
   Supplier extends IModule,
   Consumer extends IModule = any,
   Token = string|symbol
>
{
   fromSource: LocalProviderToken<ParamType, Supplier, Token>;
   exportTo: LocalProviderToken<ParamType, Consumer>;
}
