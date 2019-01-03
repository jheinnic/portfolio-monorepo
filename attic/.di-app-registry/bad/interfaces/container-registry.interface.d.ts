import { interfaces } from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import { ApplicationInstaller, ApplicationIdentifier, InstallerModuleCallBack } from '.';
export interface IContainerRegistry {
    registerInstallers(...installerCallbacks: [InstallerModuleCallBack]): void;
    installApplication<A extends ApplicationInstaller>(applicationIdentifier: ApplicationIdentifier<A>): void;
    get<T>(injectLabel: ServiceIdentifier<T>): T;
}
