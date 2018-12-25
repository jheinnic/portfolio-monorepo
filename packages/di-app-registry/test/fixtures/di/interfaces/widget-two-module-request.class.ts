import {injectable} from 'inversify';

import {installerRequest, installDependency} from '../../../../src/decorators';
import {IContainerAccessStrategy} from '../../../../bad/module/container-access-strategy.interface';
import {DI_COMMON_TAGS} from '../../../../src/di';
import {APP_DI_TYPES} from '../../apps/widget-shares-lib-one.app';
import {FIXTURE_TYPES} from '../types';

// export interface WidgetTwoModuleOptions {
// bindWhen: IDirectorFunction<BindingWhenSyntax<IWidget>>;
// libOne: interfaces.Newable<IAdapter<ILibrary>>;
// libTwo: interfaces.FactoryCreator<ILibrary>
// }

import {ILibrary} from '../../interfaces';
@installerRequest()
@injectable()
export class WidgetTwoModuleOptions {
   constructor( partial: Partial<WidgetTwoModuleOptions> ) {
      Object.assign(this, partial);
   }

   @installDependency(
      FIXTURE_TYPES.Library,
      { type: 'tagged', key: DI_COMMON_TAGS.VariantFor, value: APP_DI_TYPES.libOne },
      'Singleton'
   )
   public libOne: IContainerAccessStrategy<ILibrary>;

   @installDependency(
      FIXTURE_TYPES.Library,
      { type: 'tagged', key: DI_COMMON_TAGS.VariantFor, value: APP_DI_TYPES.libTwo },
      'Singleton'
   )
   public libTwo: IContainerAccessStrategy<ILibrary>;

   @installDependency(
      FIXTURE_TYPES.Library,
      { type: 'tagged', key: DI_COMMON_TAGS.VariantFor, value: APP_DI_TYPES.libThree },
      'Singleton'
   )
   public libThree: IContainerAccessStrategy<ILibrary>;
}
