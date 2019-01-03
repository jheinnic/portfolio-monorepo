import { interfaces } from 'inversify';
import { ConstructorFor } from 'simplytyped';
import { ApplicationIdentifier, ApplicationInstaller, IInstallerModuleBuilder, InstallerRequestIdentifier, InstallerService, InstallerServiceIdentifier } from './interfaces';
export declare class InstallerModuleBuilder implements IInstallerModuleBuilder {
    private readonly bind;
    constructor(bind: interfaces.Bind);
    bindApplication<A extends ApplicationInstaller>(applicationIdentifier: ApplicationIdentifier<A>, applicationInstaller: ConstructorFor<A>): void;
    bindInstaller<I extends Object, O extends Object | void, M extends InstallerService<I, O>>(installRequestIdentifier: InstallerRequestIdentifier<I>, requestConstructor: ConstructorFor<I>, installServiceIdentifier: InstallerServiceIdentifier<I, O>, serviceConstructor: ConstructorFor<M>): void;
}
