import { interfaces } from 'inversify';
import { IDirector } from '@jchptf/api';
import { IContainerRegistryInternal } from './interfaces/container-registry-internal.interface';
import { IContainerAccessStrategy, IContainerRegistryInstallerClient, InstallerServiceIdentifier, NestedContainerIdentifier } from './interfaces';
import { ClassType } from 'class-transformer-validator';
export declare class ContainerRegistryInstallerClient implements IContainerRegistryInstallerClient {
    private readonly registryInternal;
    constructor(registryInternal: IContainerRegistryInternal);
    getConfig<T extends object>(configClass: ClassType<T>, rootPath?: string): T;
    createChild(childId: NestedContainerIdentifier, allowExists?: boolean): IContainerRegistryInstallerClient;
    fromChild(childId: NestedContainerIdentifier, director: IDirector<IContainerRegistryInstallerClient>): IContainerRegistryInstallerClient;
    load(callback: interfaces.ContainerModuleCallBack): IContainerRegistryInstallerClient;
    loadFromChild(childId: NestedContainerIdentifier, callback: interfaces.ContainerModuleCallBack, allowCreate?: boolean): IContainerRegistryInstallerClient;
    install<Import, Export>(installerId: InstallerServiceIdentifier<Import, Export>, requestBody: Import): Export;
    installFromChild<Import, Export>(childId: NestedContainerIdentifier, installerId: InstallerServiceIdentifier<Import, Export>, requestBody: Import, allowCreate?: boolean): Export;
    adaptFromChild<T>(childId: NestedContainerIdentifier, accessStrategy: IContainerAccessStrategy<T>, trustUntagged?: boolean): IContainerAccessStrategy<T>;
    adaptForChild<T>(childId: NestedContainerIdentifier, grandChildId: NestedContainerIdentifier, grandChildAccessStrategy: IContainerAccessStrategy<T>, trustUntagged?: boolean): IContainerAccessStrategy<T>;
    /**
     *
     * Note that:
     * -- If allowCreate is false, this method will either return true or throw, but will
     *    never return false.
     * -- If allowCreate is true, this method will either return true or return false, but
     *    will never throw.
     *
     * @param childId Identifier to check for
     * @param allowCreate True if container may be created if it does not exist, false if
     * non-existence calls for a thrown error.
     * @returns True if the child container already exists, false if it did not exist but
     * was created by this call.
     */
    private validateChildId;
}
