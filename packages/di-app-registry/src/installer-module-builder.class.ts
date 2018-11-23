import {interfaces} from 'inversify';
import {ConstructorFor} from 'simplytyped';

import {
   ApplicationIdentifier, ApplicationInstaller, IInstallerModuleBuilder, InstallerRequestIdentifier,
   InstallerService, InstallerServiceIdentifier
} from './interfaces';
import ServiceIdentifier = interfaces.ServiceIdentifier;

export class InstallerModuleBuilder implements IInstallerModuleBuilder
{
   constructor(private readonly bind: interfaces.Bind) { }

   public bindApplication<A extends ApplicationInstaller>(
      applicationIdentifier: ApplicationIdentifier<A>,
      applicationInstaller: ConstructorFor<A>): void
   {
      this.bind<A>(applicationIdentifier)
         .to(applicationInstaller);
   }

   public bindInstaller<M extends InstallerService>(
      installServiceIdentifier: ServiceIdentifier<M>,
      serviceConstructor: ConstructorFor<M>): void
   {
      this.bind(installServiceIdentifier)
         .to(serviceConstructor)
         .inSingletonScope();
   }
}