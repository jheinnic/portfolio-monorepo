import {inject, injectable, interfaces, taggedConstraint} from 'inversify';

import {InstallerApi, InstallerFactory, InstallerService} from '../../../../src/interfaces';
import {FIXTURE_TYPES, LibraryModuleOptions, WidgetOneModuleOptions} from '..';
import {FIXTURE_DI_TYPES} from '../types';
import {IWidget} from '../../interfaces/widget.interface';
import {WIDGET_ONE_TAG_VALUES, WidgetOne} from '../../components/widget-one.class';
import {IDirector} from '@jchptf/api';
import {ILibrary} from '../../interfaces/library.interface';
import {DI_COMMON_TAGS} from '../../../../src/types';
import {toCompoundDirector} from '../../../../src/support/to-compound-director.function';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;

@injectable()
export class WidgetOneModuleInstaller implements InstallerService<[WidgetOneModuleOptions]>
{
   constructor(
      @inject(
         FIXTURE_DI_TYPES.LibraryInstaller) private readonly library: InstallerFactory<[LibraryModuleOptions]>
   ) { }

   install(options: WidgetOneModuleOptions): ContainerModuleCallBack
   {
      return (bind: interfaces.Bind, _unbind: interfaces.Unbind, _isBound: interfaces.IsBound,
         _rebind: interfaces.Rebind) =>
      {
         options.bindWhen(
            bind<IWidget>(FIXTURE_TYPES.Widget)
               .to(WidgetOne)
         );

         if (!!options.libOneCurator) {
            const compoundDirector: IDirector<BindingWhenSyntax<any>> =
               toCompoundDirector(options.bindWhen, (builder: BindingWhenOnSyntax<ILibrary>) => {
                  builder.when((request: interfaces.Request) =>
                     taggedConstraint(DI_COMMON_TAGS.VariantFor)(WIDGET_ONE_TAG_VALUES.libDepOne)(request)
                  );
               });
            compoundDirector(
               bind<ILibrary>(FIXTURE_TYPES.Library)
                  .toDynamicValue((context: interfaces.Context): ILibrary => {
                     return context.container.getTagged(
                        FIXTURE_TYPES.Library, DI_COMMON_TAGS.CuratorOf, options.libOneCurator
                     );
                  }));
         } else {
            this.library({
               bindWhen: bindWhen => bindWhen.whenTargetTagged(
                  DI_COMMON_TAGS.VariantFor, WIDGET_ONE_TAG_VALUES.libDepOne),
               initialValue: 3
            })
         }

         if (!!options.libTwoCurator) {
            const compoundDirector: IDirector<BindingWhenSyntax<any>> =
               toCompoundDirector(options.bindWhen, (builder: BindingWhenOnSyntax<ILibrary>) => {
                  builder.whenTargetTagged(DI_COMMON_TAGS.VariantFor, WIDGET_ONE_TAG_VALUES.libDepTwo)
               });
            compoundDirector(
               bind<ILibrary>(FIXTURE_TYPES.Library)
                  .toDynamicValue((context: interfaces.Context): ILibrary => {
                     return context.container.getTagged(
                        FIXTURE_TYPES.Library, DI_COMMON_TAGS.CuratorOf, options.libTwoCurator
                     );
                  }));
         } else {
            this.library({
               bindWhen: bindWhen => bindWhen.whenTargetTagged(
                  DI_COMMON_TAGS.VariantFor, WIDGET_ONE_TAG_VALUES.libDepTwo),
               initialValue: 3
            });
         }
      };
   }
}

export function registerWidgetOneModule(bind: InstallerApi)
{
   bind.bindInstaller<WidgetOneModuleInstaller>(FIXTURE_DI_TYPES.WidgetOneInstaller)
      .toService(WidgetOneModuleInstaller)
}