import {ConstructorFor} from 'simplytyped';
import {
   ApplicationIdentifier, ApplicationInstaller, InstallerRequestIdentifier, InstallerService,
   InstallerServiceIdentifier
} from '..';
import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import * as M from 'minimatch';

export interface IInstallerModuleBuilder
{
  bindInstaller<M extends InstallerService>(
      // installRequestIdentifier: InstallerRequestIdentifier<I>,
      // requestConstructor: ConstructorFor<I>,
      installerIdentifier: ServiceIdentifier<M>,
      svcConstructor: ConstructorFor<M>): void;

   bindApplication<A extends ApplicationInstaller>(
      applicationIdentifier: ServiceIdentifier<A>,
      constructor: ConstructorFor<A>): void;
}