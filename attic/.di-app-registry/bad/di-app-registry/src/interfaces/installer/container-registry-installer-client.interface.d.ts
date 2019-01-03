import { interfaces } from 'inversify';
import { IDirector } from '@jchptf/api';
import { NestedContainerIdentifier, InstallerServiceIdentifier, IContainerAccessStrategy } from '..';
import { ClassType } from 'class-transformer-validator';
export interface IContainerRegistryInstallerClient {
    getConfig<T extends object>(configClass: ClassType<T>, rootPath?: string): T;
    createChild(id: NestedContainerIdentifier, allowExists?: boolean): IContainerRegistryInstallerClient;
    fromChild(id: NestedContainerIdentifier, director: IDirector<IContainerRegistryInstallerClient>, allowCreate?: boolean): IContainerRegistryInstallerClient;
    load(callback: interfaces.ContainerModuleCallBack): IContainerRegistryInstallerClient;
    loadFromChild(id: NestedContainerIdentifier, callback: interfaces.ContainerModuleCallBack, allowCreate?: boolean): IContainerRegistryInstallerClient;
    install<Import, Export>(installerId: InstallerServiceIdentifier<Import, Export>, requestMessage: Import): Export;
    installFromChild<Import, Export>(childId: NestedContainerIdentifier, installerId: InstallerServiceIdentifier<Import, Export>, requestMessage: Import, allowCreate?: boolean): Export;
    adaptFromChild<T>(childId: NestedContainerIdentifier, childAccess: IContainerAccessStrategy<T>, trustUntagged?: boolean): IContainerAccessStrategy<T>;
}
