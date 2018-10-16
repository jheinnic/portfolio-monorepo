import {interfaces} from 'inversify';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;
import {ContainerRegistryInternal} from './container-registry-internal.interface';

export interface ApplicationInstaller {
   install(client: ContainerRegistryInternal): void;
}
