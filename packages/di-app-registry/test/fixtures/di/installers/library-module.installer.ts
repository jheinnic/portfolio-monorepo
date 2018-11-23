import {injectable, interfaces} from 'inversify';

import {IDirector} from '@jchptf/api';
import {toChildDirector} from '../../../../src/support/to-child-director.function';
import {IInstallerModuleBuilder, InstallerService, InstallerRegistryClient} from '../../../../src/interfaces';

import {FIXTURE_DI_TYPES, FIXTURE_TYPES} from '../types';
import {LibraryModuleRequest} from '../interfaces';

import {Library} from '../../components/library.class';
import {ILibrary} from '../../interfaces';

@injectable()
export class LibraryModuleInstaller implements InstallerService<LibraryModuleRequest, void>
{
   install(client: InstallerRegistryClient, options: LibraryModuleRequest): void
   {
      client.load(
         (bind: interfaces.Bind, _unbind: interfaces.Unbind, _isBound: interfaces.IsBound,
            _rebind: interfaces.Rebind) =>
         {
            options.bindWhen(
               bind<ILibrary>(FIXTURE_TYPES.Library)
                  .to(Library)
                  .inSingletonScope()
            );

            const childDirector: IDirector<interfaces.BindingWhenSyntax<any>> =
               toChildDirector(options.bindWhen);
            childDirector(
               bind<number>(FIXTURE_TYPES.InitialValue)
                  .toConstantValue(options.initialValue)
            )
         }
      );
   }
}

export function registerLibraryModule(bind: IInstallerModuleBuilder)
{
   bind.bindInstaller<LibraryModuleRequest, void>(
      FIXTURE_DI_TYPES.LibraryRequest, LibraryModuleRequest,
      FIXTURE_DI_TYPES.LibraryInstaller, LibraryModuleInstaller
   )
}