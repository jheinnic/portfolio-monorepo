import {InstallerFactory} from './installer-factory.interface';
import {InstallerFactoryCreator} from './installer-factory-creator.interface';

export interface BindingInstallerSyntax<I extends InstallerFactory> {
   to(installer: I): void;
   toFactory(factory: InstallerFactoryCreator<Parameters<ReturnType<I>>>): void;
}
