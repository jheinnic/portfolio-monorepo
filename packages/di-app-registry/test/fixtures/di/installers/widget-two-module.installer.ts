import {inject, injectable, interfaces, taggedConstraint} from 'inversify';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;

import {IDirectorFunction} from '@jchptf/api';
import {IInstallerModuleBuilder, InstallerService} from '../../../../src/interfaces';
import {FIXTURE_TYPES, LibraryModuleRequest, WidgetOneModuleRequest} from '..';
import {FIXTURE_DI_TYPES} from '../types';
import {ILibrary, IWidget} from '../../interfaces';
import {WIDGET_ONE_TAG_VALUES, WidgetOne} from '../../components/widget-one.class';
import {DI_COMMON_TAGS} from '../../../../src/di';
import {toCompoundDirector} from '../../../../src/abort/support/to-compound-director.function';

@injectable()
export class WidgetOneModuleInstaller implements InstallerService<[WidgetOneModuleRequest]>
{
   constructor(
      @inject(
         FIXTURE_DI_TYPES.LibraryInstaller) private readonly library: InstallerService<[LibraryModuleRequest]>
   ) { }

   install(options: WidgetOneModuleRequest): ContainerModuleCallBack
   {
      return (bind: interfaces.Bind, _unbind: interfaces.Unbind, _isBound: interfaces.IsBound,
         _rebind: interfaces.Rebind) =>
      {
         options.bindWhen(
            bind<IWidget>(FIXTURE_TYPES.Widget)
               .to(WidgetOne)
         );

         if (!!options.libOneCurator) {
            const compoundDirector: IDirectorFunction<BindingWhenSyntax<any>> =
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
            this.library.install({
               bindWhen: bindWhen => bindWhen.whenTargetTagged(
                  DI_COMMON_TAGS.VariantFor, WIDGET_ONE_TAG_VALUES.libDepOne),
               initialValue: 3
            })
         }

         if (!!options.libTwoCurator) {
            const compoundDirector: IDirectorFunction<BindingWhenSyntax<any>> =
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
            this.library.install({
               bindWhen: bindWhen => bindWhen.whenTargetTagged(
                  DI_COMMON_TAGS.VariantFor, WIDGET_ONE_TAG_VALUES.libDepTwo),
               initialValue: 3
            });
         }
      };
   }
}

export function registerWidgetOneModule(bind: IInstallerModuleBuilder)
{
   bind.bindInstaller<WidgetOneModuleInstaller>(FIXTURE_DI_TYPES.WidgetOneInstaller)
      .to(WidgetOneModuleInstaller)
}