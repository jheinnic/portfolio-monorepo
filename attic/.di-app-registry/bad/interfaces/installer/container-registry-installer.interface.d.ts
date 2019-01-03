import { interfaces } from 'inversify';
import { IDirector } from '@jchptf/api';
import { NestedContainerIdentifier } from '../index';
import { InstallerServiceIdentifier } from '../index';
import { IContainerAccessStrategy } from './container-access-strategy.interface';
export interface IContainerRegistryInstallerClient {
    toChildContainer(id: NestedContainerIdentifier, director: IDirector<IContainerRegistryInstallerClient>): void;
    injectContainerModule(callback: interfaces.ContainerModuleCallBack): void;
    requestInstallerModule<Imports, Exports>(id: InstallerServiceIdentifier<Imports, Exports>, requestBody: Imports): Exports;
    adaptAccessFromChild<T>(id: NestedContainerIdentifier, strategy: IContainerAccessStrategy<T>): IContainerAccessStrategy<T>;
}
