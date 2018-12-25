import {interfaces} from 'inversify';
import {ConstructorFor} from 'simplytyped';

import {
   ApplicationIdentifier, ApplicationLauncher, IInstallerModuleBuilder, InstallerService
} from '../src/interfaces/index';
import ServiceIdentifier = interfaces.ServiceIdentifier;

export class InstallerModuleBuilder implements IInstallerModuleBuilder
{
   constructor(private readonly bind: interfaces.Bind) { }

   public bindApplication<A extends ApplicationLauncher>(
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