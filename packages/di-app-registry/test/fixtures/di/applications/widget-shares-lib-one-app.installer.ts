import {inject, injectable, interfaces} from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import {ApplicationInstaller, InstallerApi, InstallerService} from '../../../../src/interfaces';
import {ILibrary} from '../../interfaces/library.interface';
import {APP_DI_TYPES} from '../../apps/two-libs.app';
import {FIXTURE_DI_TYPES, FIXTURE_TYPES} from '../types';
import {LibraryModuleOptions, WidgetOneModuleOptions} from '..';
import {IWidget} from '../../interfaces/widget.interface';
import {DI_COMMON_TAGS} from '../../../../src/types';
import {WidgetSharesLibOneApp} from '../../apps/widget-shares-lib-one.app';


@injectable()
export class WidgetSharesLibOneAppInstaller implements ApplicationInstaller {
   constructor(
      @inject(FIXTURE_DI_TYPES.LibraryInstaller) private readonly library: InstallerService<[LibraryModuleOptions]>,
      @inject(FIXTURE_DI_TYPES.WidgetOneInstaller) private readonly widgetOne: InstallerService<[WidgetOneModuleOptions]>)
   {
   }

   install(): interfaces.ContainerModuleCallBack {
      let callBack: interfaces.ContainerModuleCallBack = (bind: interfaces.Bind) => {
         bind(FIXTURE_TYPES.Application).to(WidgetSharesLibOneApp);
      };

      this.library.install({
         bindWhen: (bindWhen: BindingWhenSyntax<ILibrary>) => {
            bindWhen.whenTargetTagged(DI_COMMON_TAGS.CuratorOf, APP_DI_TYPES.libOne)
         },
         initialValue: 1
      });

      this.library.install({
         bindWhen: (bindWhen: BindingWhenSyntax<ILibrary>) => {
            bindWhen.whenTargetTagged(DI_COMMON_TAGS.CuratorOf, APP_DI_TYPES.libTwo)
         },
         initialValue: 2
   });

      this.library.install({
         bindWhen: (bindWhen: BindingWhenSyntax<ILibrary>) => {
            bindWhen.whenTargetTagged(DI_COMMON_TAGS.CuratorOf, APP_DI_TYPES.libThree)
         },
         initialValue: 3
      });

      this.widgetOne.install({
         bindWhen: (bindWhen: BindingWhenSyntax<IWidget>) => {
            bindWhen.whenTargetTagged(DI_COMMON_TAGS.VariantFor, FIXTURE_TYPES.Application)
         },
         libOneCurator: APP_DI_TYPES.libOne,
         libTwoCurator: undefined
      });

      return callBack;
   }
}

export function registerWidgetSharesLibOneApp(bind: InstallerApi) {
   bind.bindApplication(FIXTURE_DI_TYPES.ApplicationInstaller).to(WidgetSharesLibOneAppInstaller);
}