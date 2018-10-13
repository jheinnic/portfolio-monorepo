import {BindingInstallerSyntax, InstallerFactory, InstallerFactoryCreator} from './interfaces';
import {interfaces} from 'inversify';

export class BindInstallerSyntax<I extends InstallerFactory> implements BindingInstallerSyntax<I> {
   constructor(private readonly bindTo: interfaces.BindingToSyntax<any>) {
   }

   public to(installer: I): void
   {
      this.bindTo.toFunction(installer);
   }

   public toFactory(creator: InstallerFactoryCreator<Parameters<ReturnType<I>>>): void
   {
      this.bindTo.toFactory(creator);
   }
}