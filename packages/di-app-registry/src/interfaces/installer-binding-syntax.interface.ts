import {InstallerConstructor, InstallerFactory, InstallerService} from './installer-factory.interface';
import {InstallerFactoryCreator} from './installer-factory-creator.interface';

export interface BindingInstallerSyntax<I extends (InstallerFactory|InstallerService)> {
   to(installer: (I & InstallerFactory)): void;
   toFactory(factory: InstallerFactoryCreator<I & InstallerFactory>): void;
   toService(installer: InstallerConstructor<I & InstallerService>): void;
}
