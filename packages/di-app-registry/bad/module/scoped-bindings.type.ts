import {ImportsFor} from '../imports-for.type';
import {interfaces} from 'inversify';
import {Keys} from 'simplytyped';

export type ScopedBindings<K extends Keys<any> = Keys<any>> = {
   [P in K]: (config: Config, imports: ImportsFor<Imports>) => interfaces.ContainerModuleCallBack;
}