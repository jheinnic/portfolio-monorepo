import {interfaces} from 'inversify';
import {ConstructorFor} from 'simplytyped';

import {
   ApplicationIdentifier, ApplicationInstaller, IInstallerModuleBuilder, InstallerRequestIdentifier,
   InstallerService, InstallerServiceIdentifier
} from './interfaces';

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

   public bindInstaller<I extends Object, O extends Object | void, M extends InstallerService<I, O>>(
      installRequestIdentifier: InstallerRequestIdentifier<I>,
      requestConstructor: ConstructorFor<I>,
      installServiceIdentifier: InstallerServiceIdentifier<I, O>,
      serviceConstructor: ConstructorFor<M>): void
   {
      this.bind(installRequestIdentifier)
         .toConstructor(requestConstructor);
      this.bind(installServiceIdentifier)
         .to(serviceConstructor)
         .inSingletonScope();
   }
}