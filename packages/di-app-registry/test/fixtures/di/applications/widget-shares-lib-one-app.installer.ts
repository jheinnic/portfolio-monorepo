import {inject, injectable, interfaces} from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

import {ApplicationLauncher, IInstallerModuleBuilder, InstallerService} from '../../../../src/interfaces';
import {ILibrary, IWidget} from '../../interfaces';
import {FIXTURE_DI_TYPES, FIXTURE_TYPES} from '../types';
import {LibraryModuleRequest, WidgetOneModuleRequest} from '..';
import {DI_COMMON_TAGS} from '../../../../src/di';
import {APP_DI_TYPES, WidgetSharesLibOneApp} from '../../apps/widget-shares-lib-one.app';
import {ConstructorFor} from 'simplytyped';


@injectable()
export class WidgetSharesLibOneAppInstaller implements ApplicationLauncher {
   constructor(
      @inject(FIXTURE_DI_TYPES.LibraryRequest) private readonly library: ConstructorFor<LibraryModuleRequest>,
      @inject(FIXTURE_DI_TYPES.WidgetOneRequest) private readonly widgetOne: InstallerService<[WidgetOneModuleRequest]>,
      @inject(FIXTURE_DI_TYPES.WidgetTwoRequest) private readonly widgetTwo: InstallerService<[WidgetOneModuleRequest]>)
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

      this.widgetOne.install(new WidgetOneModuleRequest({
         bindWhen: (bindWhen: BindingWhenSyntax<IWidget>) => {
            bindWhen.whenTargetTagged(DI_COMMON_TAGS.VariantFor, FIXTURE_TYPES.Application)
         },
         libOneCurator: APP_DI_TYPES.libOne,
         libTwoCurator: undefined,
         myProp: null
      }));

      return callBack;
   }
}

export function registerWidgetSharesLibOneApp(bind: IInstallerModuleBuilder) {
   bind.bindApplication(FIXTURE_DI_TYPES.ApplicationInstaller)
      .to(WidgetSharesLibOneAppInstaller);
}