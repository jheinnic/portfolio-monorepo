import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;

import {ApplicationInstaller, ApplicationIdentifier, InstallerModuleCallBack} from '.';
import {InjectDecorators} from './inject-decorators.type';

export interface IContainerRegistry {
   getLazyInjection(): InjectDecorators;

   registerInstallers( ...installerCallbacks: [InstallerModuleCallBack]): void;

   installApplication<A extends ApplicationInstaller>( applicationIdentifier: ApplicationIdentifier<A> ): void;

   get<T>(injectLabel: ServiceIdentifier<T>): T;
}