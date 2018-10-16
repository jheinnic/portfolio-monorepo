import {InstallerServiceIdentifier} from './installer-service-identifier.interface';
import {ApplicationInstaller} from './application-installer.interface';
import {ApplicationIdentifier} from './application-identifier.interface';
import {InstallModuleIdentifier} from '../abort/install-module-identifier.interface';
import {InstallationActivityFactory} from '../abort/installation-activity-factory.interface';
import {ConstructorFor} from 'simplytyped';
import {InstallerService} from './installer-service.interface';

export interface IInstallerModuleBuilder
{
   bindInstaller<I, O, M extends InstallerService<I, O>>(
      installServiceIdentifier: InstallerServiceIdentifier<I, O>,
      installRequestIdentifier: InstallerRequestIdentifier<I>,
      requestConstructor: ConstructorFor<I>,
      svcConstructor: ConstructorFor<M>): void;

   bindApplication<A extends ApplicationInstaller>(
      applicationIdentifier: ApplicationIdentifier<A>,
      constructor: ConstructorFor<A>): void;


}