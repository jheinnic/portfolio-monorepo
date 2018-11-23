import {injectable} from 'inversify';

import {ILibrary} from '../../interfaces';
import {IContainerAccessStrategy} from '../../../../src/interfaces/installer/container-access-strategy.interface';
import {DI_COMMON_TAGS} from '../../../../src/types';
import {APP_DI_TYPES} from '../../apps/widget-shares-lib-one.app';
import {FIXTURE_TYPES} from '../types';
import {installerRequest, installDependency} from '../../../../src/decorators';

// export interface WidgetOneModuleOptions {
//    bindWhen: IDirector<BindingWhenSyntax<IWidget>>;
//    libOneCurator?: symbol;
//    libTwoCurator?: symbol;
// }

@installerRequest()
@injectable()
export class WidgetOneModuleRequest {
   // public bindWhen: IDirectorFunction<BindingWhenSyntax<IWidget>>;

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
