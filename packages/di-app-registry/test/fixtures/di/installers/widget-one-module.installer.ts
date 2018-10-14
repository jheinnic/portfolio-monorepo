import {inject, interfaces} from 'inversify';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;

import {InstallerApi, InstallerFactory, InstallerService} from '../../../../src/interfaces';
import {LibraryModuleOptions} from '..';
import {FIXTURE_DI_TYPES} from '../types';

export class WidgetOneModuleInstaller implements InstallerService
{
   constructor(
      @inject(
         FIXTURE_DI_TYPES.LibraryInstaller) private readonly libraryInst: InstallerFactory<[LibraryModuleOptions]>
   )
   {
   }

   install(): ContainerModuleCallBack
   {
      console.log(this.libraryInst);
      return () => { };
   }

   /*
   return (options: LibraryModuleOptions): interfaces.ContainerModuleCallBack =>
      (
         bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound,
         rebind: interfaces.Rebind) =>
      {
         callBackFn(bind, unbind, isBound, rebind);

         options.bindWhen(
            bind<ILibrary>(FIXTURE_TYPES.Library)
               .to(Library)
         );
         const childDirector: IDirector<BindingWhenSyntax<any>> =
            toChildDirector(options.bindWhen);
         childDirector(
            bind<number>(FIXTURE_TYPES.InitialValue)
               .toConstantValue(options.initialValue)
         )
      };
      */
}

export function registerWidgetOneModule(bind: InstallerApi)
{
   bind.bindInstaller<WidgetOneModuleInstaller>(FIXTURE_DI_TYPES.WidgetOneModule)
      .toService(WidgetOneModuleInstaller)
}