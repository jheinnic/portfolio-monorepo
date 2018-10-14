import {InstallerIdentifier} from './installer-identifier.interface';
import {BindingInstallerSyntax} from './installer-binding-syntax.interface';
import {ApplicationIdentifier} from './application-identifier.interface';
import {ApplicationBindingSyntax} from './application-binding-syntax.interface';
import {ApplicationInstaller} from './application-installer.interface';
import {InstallerFactory, InstallerService} from './installer-service.interface';

export type BindInstaller = <I extends (InstallerFactory|InstallerService)>(installerIdentifier: InstallerIdentifier<I>) => BindingInstallerSyntax<I>;

export type BindApplication = <A extends ApplicationInstaller>(applicationIdentifier: ApplicationIdentifier<A>) => ApplicationBindingSyntax<A>;

export type InstallerApi = {
   bindInstaller: BindInstaller;
   bindApplication: BindApplication;
}
// export type RebindInstaller<P extends any[] = []> = (installerIdentifier: InstallerIdentifier<P>) => BindingInstallerSyntax<P>;

// export type RebindApplication = (applicationIdentifier: ApplicationIdentifier) => ApplicationBindingSyntax;

export type InstallerModuleCallBack = (bind: InstallerApi) => void;

