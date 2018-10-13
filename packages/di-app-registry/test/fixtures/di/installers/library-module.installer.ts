import {LibraryModuleOptions} from '../interfaces/library-module-options.interface';
import {interfaces} from 'inversify';

import {IDirector} from '@jchptf/api';
import {FIXTURE_DI_TYPES, FIXTURE_TYPES} from '../types';
import {Library} from '../../components/library.class';
import {ILibrary} from '../../interfaces/library.interface';
import {toChildDirector} from '../../../../src/support/to-child-director.function';
import {InstallerApi} from '../../../../src/interfaces';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

export function libraryModuleInstaller(callBackFn: ContainerModuleCallBack)
{
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
}

export function registerLibraryModule(bind: InstallerApi)
{
   bind.bindInstaller<typeof libraryModuleInstaller>(FIXTURE_DI_TYPES.LibraryInstaller)
      .to(libraryModuleInstaller)
}