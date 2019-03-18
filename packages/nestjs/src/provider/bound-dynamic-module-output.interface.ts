import { LocalProviderToken } from '../token';

export interface IBoundDynamicModuleOutput {
   localToken: LocalProviderToken<any>;
   exposeAsToken: this['localToken'];
}
