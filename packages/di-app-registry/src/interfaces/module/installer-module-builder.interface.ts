import {ConstructorFor} from 'simplytyped';
import {
   ApplicationIdentifier, ApplicationInstaller, InstallerRequestIdentifier, InstallerService,
   InstallerServiceIdentifier
} from '..';

export interface IInstallerModuleBuilder
{
   bindInstaller<I extends object, O extends object | void>(
      installRequestIdentifier: InstallerRequestIdentifier<I>,
      requestConstructor: ConstructorFor<I>,
      installServiceIdentifier: InstallerServiceIdentifier<I, O>,
      svcConstructor: ConstructorFor<InstallerService<I, O>>): void;

   bindApplication<A extends ApplicationInstaller>(
      applicationIdentifier: ApplicationIdentifier<A>,
      constructor: ConstructorFor<A>): void;
}