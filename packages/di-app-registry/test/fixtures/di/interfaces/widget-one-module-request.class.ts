import {injectable, interfaces} from 'inversify';

import {ILibrary, IWidget} from '../../interfaces';
import {IContainerAccessStrategy} from '../../../../bad/module/container-access-strategy.interface';
import {DI_COMMON_TAGS} from '../../../../src/di';
import {APP_DI_TYPES} from '../../apps/widget-shares-lib-one.app';
import {FIXTURE_TYPES} from '../types';
import {installDependency} from '../../../../src/decorators';
import {IDirector} from '@jchptf/api';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

// export interface WidgetOneModuleOptions {
//    bindWhen: IDirector<BindingWhenSyntax<IWidget>>;
//    libOneCurator?: symbol;
//    libTwoCurator?: symbol;
// }

// @installerRequest()
@injectable()
export class WidgetOneModuleRequest {
   public bindWhen: IDirector<BindingWhenSyntax<IWidget>>;

   constructor( partial: Partial<WidgetOneModuleRequest> ) {
      Object.assign(this, partial);
   }

   @installDependency(
      FIXTURE_TYPES.Library,
      { type: 'tagged', key: DI_COMMON_TAGS.VariantFor, value: APP_DI_TYPES.libOne },
      'Singleton'
   )
   public libOneCurator: IContainerAccessStrategy<ILibrary>;

   @installDependency(
      FIXTURE_TYPES.Library,
      { type: 'tagged', key: DI_COMMON_TAGS.VariantFor, value: APP_DI_TYPES.libTwo },
      'Singleton'
   )
   public libTwoCurator: IContainerAccessStrategy<ILibrary>;
}
