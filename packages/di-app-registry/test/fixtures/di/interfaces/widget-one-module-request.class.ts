import {injectable} from 'inversify';

import {ILibrary} from '../../interfaces';
import {IContainerAccessStrategy} from '../../../../src/interfaces/installer/container-access-strategy.interface';
import {DI_COMMON_TAGS} from '../../../../src/types';
import {APP_DI_TYPES} from '../../apps/widget-shares-lib-one.app';
import {FIXTURE_TYPES} from '../types';
import {installerRequest, requiredImport} from '../../../../src/decorators';

// export interface WidgetOneModuleOptions {
//    bindWhen: IDirector<BindingWhenSyntax<IWidget>>;
//    libOneCurator?: symbol;
//    libTwoCurator?: symbol;
// }

@installerRequest()
@injectable()
export class WidgetOneModuleOptions {
   // public bindWhen: IDirectorFunction<BindingWhenSyntax<IWidget>>;
   // public libOneCurator?: symbol;

   constructor( partial: Partial<WidgetOneModuleOptions> ) {
      Object.assign(this, partial);
   }

   @requiredImport(
      FIXTURE_TYPES.Library,
      { type: 'tagged', key: DI_COMMON_TAGS.VariantFor, value: APP_DI_TYPES.libOne },
      'Singleton'
   )
   public libOneCurator: IContainerAccessStrategy<ILibrary>;

   @requiredImport(
      FIXTURE_TYPES.Library,
      { type: 'tagged', key: DI_COMMON_TAGS.VariantFor, value: APP_DI_TYPES.libTwo },
      'Singleton'
   )
   public libTwoCurator: IContainerAccessStrategy<ILibrary>;
}
