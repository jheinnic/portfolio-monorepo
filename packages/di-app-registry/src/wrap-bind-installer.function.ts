import {interfaces} from 'inversify';
import {
   BindingInstallerSyntax, BindInstaller, InstallerFactory, InstallerIdentifier, InstallerService
} from './interfaces';
import {BindInstallerSyntax} from './bind-installer.class';

export function wrapBindInstaller(bind: interfaces.Bind): BindInstaller
{
   function installerBind<I extends (InstallerFactory | InstallerService)>(installerIdentifier: InstallerIdentifier<I>): BindingInstallerSyntax<I>
   {
      return new BindInstallerSyntax<I>(
         bind(installerIdentifier));
   }

   return installerBind;
}
