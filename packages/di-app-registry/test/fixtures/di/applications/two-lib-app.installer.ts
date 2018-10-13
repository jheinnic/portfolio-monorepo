import {ApplicationInstaller, InstallerApi, InstallerFactory} from '../../../../src/interfaces';
import {inject, injectable, interfaces} from 'inversify';
import {LibraryModuleOptions} from '../interfaces/library-module-options.interface';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
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

      callBack = this.library(callBack)({
         bindWhen: (bindWhen: BindingWhenSyntax<ILibrary>) => {
            bindWhen.whenTargetNamed(APP_DI_TYPES.libOne)
         },
         initialValue: 3
      });

      return this.library(callBack)({
         bindWhen: bindWhen => bindWhen.whenTargetNamed(APP_DI_TYPES.libTwo),
         initialValue: 5
      })
   }
}

export function registerTwoLibApp(bind: InstallerApi) {
   bind.bindApplication(FIXTURE_DI_TYPES.ApplicationInstaller).to(TwoLibAppInstaller);
}