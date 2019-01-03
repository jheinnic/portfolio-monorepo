import { interfaces } from 'inversify';
import { ApplicationIdentifier, ApplicationInstaller, IContainerRegistry, InstallerModuleCallBack, InstallerServiceIdentifier, NestedContainerIdentifier } from './interfaces';
import { IContainerRegistryInternal } from './interfaces/container-registry-internal.interface';
import { ClassType } from 'class-transformer-validator';
export declare class ContainerRegistry implements IContainerRegistry, IContainerRegistryInternal {
    private static readonly INSTANCE;
    private readonly installerContainer;
    private readonly applicationContainer;
    private currentAppContainer;
    private readonly parentContainerStack;
    private readonly installerAnnotationProcessor;
    private readonly installerClient;
    private constructor();
    static getInstance(): IContainerRegistry;
    get<T>(injectLabel: interfaces.ServiceIdentifier<T>): T;
    registerInstallers(...installerCallback: [InstallerModuleCallBack]): void;
    installApplication<A extends ApplicationInstaller>(applicationLoader: ApplicationIdentifier<A>): void;
    getConfig<T extends object>(configClass: ClassType<T>, rootPath?: string): T;
    createNestedContainer(containerKey: NestedContainerIdentifier): void;
    hasNestedContainer(containerKey: NestedContainerIdentifier): boolean;
    enterNestedContainer(containerKey: NestedContainerIdentifier): void;
    exitNestedContainer(containerKey: NestedContainerIdentifier): void;
    loadModule(result: interfaces.ContainerModuleCallBack): void;
    runInstaller<Import, Export>(serviceId: InstallerServiceIdentifier<Import, Export>, requestMsg: Import): Export;
    scanExports<Export>(exportMsg: Export): Export;
    registerConfig<T extends object>(configClass: ClassType<T>, serviceIdentifier: interfaces.ServiceIdentifier<T>): void;
}
