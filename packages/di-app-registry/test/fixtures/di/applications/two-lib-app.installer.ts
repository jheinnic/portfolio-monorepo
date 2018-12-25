import {inject, injectable, interfaces} from 'inversify';
import {
   ApplicationLauncher, InstallerRegistryClient, IInstallerModuleBuilder
} from '../../../../src/interfaces';
import {LibraryModuleRequest} from '..';
import {ILibrary} from '../../interfaces';
import {APP_DI_TYPES, TwoLibsApp} from '../../apps/two-libs.app';
import {FIXTURE_DI_TYPES, FIXTURE_TYPES} from '../types';
import {ConstructorFor} from 'simplytyped';


@injectable()
export class TwoLibAppInstaller implements ApplicationLauncher
{
   constructor(
      @inject(FIXTURE_DI_TYPES.LibraryRequest)
      private readonly library: ConstructorFor<LibraryModuleRequest>)
   {
   }

   install(client: InstallerRegistryClient): void
   {
      client.load(
         (bind: interfaces.Bind) =>
            bind(FIXTURE_TYPES.Application)
               .to(TwoLibsApp));

      client.install(
         FIXTURE_DI_TYPES.LibraryInstaller,
         new this.library({
            bindWhen: (bindWhen: interfaces.BindingWhenSyntax<ILibrary>) => {
               bindWhen.whenTargetNamed(APP_DI_TYPES.libOne)
            },
            initialValue: 1
         })
      );

      client.install(
         FIXTURE_DI_TYPES.LibraryInstaller,
         new this.library({
            bindWhen: (bindWhen: interfaces.BindingWhenSyntax<ILibrary>) => {
               bindWhen.whenTargetNamed(APP_DI_TYPES.libTwo)
            },
            initialValue: 3
         })
      );
   }
}

export function registerTwoLibApp(bind: IInstallerModuleBuilder)
{
   bind.bindApplication(FIXTURE_DI_TYPES.ApplicationInstaller, TwoLibAppInstaller);
}