import {interfaces} from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

import {IDirector} from '@jchptf/api';
import {LibraryModuleOptions} from '..';
import {Library} from '../../components/library.class';
import {ILibrary} from '../../interfaces/library.interface';
import {toChildDirector} from '../../../../src/support/to-child-director.function';
import {InstallerApi} from '../../../../src/interfaces';
import {FIXTURE_DI_TYPES, FIXTURE_TYPES} from '../types';

export function libraryModuleInstaller(options: LibraryModuleOptions): interfaces.ContainerModuleCallBack
{
      return (
         bind: interfaces.Bind, _unbind: interfaces.Unbind, _isBound: interfaces.IsBound,
         _rebind: interfaces.Rebind) =>
      {
         // callBackFn(bind, unbind, isBound, rebind);

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