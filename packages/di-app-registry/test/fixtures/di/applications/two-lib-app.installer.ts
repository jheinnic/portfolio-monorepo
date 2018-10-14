import {inject, injectable, interfaces} from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import {ApplicationInstaller, InstallerApi, InstallerFactory} from '../../../../src/interfaces';
import {LibraryModuleOptions} from '../interfaces/library-module-options.interface';
import {ILibrary} from '../../interfaces/library.interface';
import {APP_DI_TYPES, TwoLibsApp} from '../../apps/two-libs.app';
import {FIXTURE_DI_TYPES, FIXTURE_TYPES} from '../types';


@injectable()
export class TwoLibAppInstaller implements ApplicationInstaller {
   constructor(
      @inject(FIXTURE_DI_TYPES.LibraryInstaller) private readonly library: InstallerFactory<[LibraryModuleOptions]>)
   {
   }

   install(): interfaces.ContainerModuleCallBack {
      let callBack: interfaces.ContainerModuleCallBack = (bind: interfaces.Bind) => {
         bind(FIXTURE_TYPES.Application).to(TwoLibsApp);
      };

      this.library({
         bindWhen: (bindWhen: BindingWhenSyntax<ILibrary>) => {
            bindWhen.whenTargetNamed(APP_DI_TYPES.libOne)
         },
         initialValue: 1
      });

      this.library({
         bindWhen: bindWhen => bindWhen.whenTargetNamed(APP_DI_TYPES.libTwo),
         initialValue: 3
      })

      return callBack;
   }
}

export function registerTwoLibApp(bind: InstallerApi) {
   bind.bindApplication(FIXTURE_DI_TYPES.ApplicationInstaller).to(TwoLibAppInstaller);
}