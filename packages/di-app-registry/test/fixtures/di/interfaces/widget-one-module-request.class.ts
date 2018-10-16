import {injectable, interfaces} from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import BindingInWhenOnSyntax = interfaces.BindingInWhenOnSyntax;
import {IDirectorFunction} from '@jchptf/api';
import {importConstraint, installerRequest} from '../../../../src/abort/decorators';
import {ILibrary, IWidget} from '../../interfaces';
import {IContainerAccessStrategy} from '../../../../src/interfaces/installer/container-access-strategy.interface';
import {DI_COMMON_TAGS} from '../../../../src/types';
import {APP_DI_TYPES} from '../../apps/widget-shares-lib-one.app';
import {FIXTURE_TYPES} from '../types';

// export interface WidgetOneModuleOptions {
//    bindWhen: IDirector<BindingWhenSyntax<IWidget>>;
//    libOneCurator?: symbol;
//    libTwoCurator?: symbol;
// }

@installerRequest()
@injectable()
export class WidgetOneModuleOptions {
   public bindWhen: IDirectorFunction<BindingWhenSyntax<IWidget>>;
   public libOneCurator?: symbol;

   constructor( partial: Partial<WidgetOneModuleOptions> ) {
      Object.assign(this, partial);
   }

   @importConstraint({
      serviceIdentifier: FIXTURE_TYPES.Library,
      director: (builder: BindingInWhenOnSyntax<ILibrary>) => {
         builder.inSingletonScope()
            .whenTargetTagged(DI_COMMON_TAGS.VariantFor, APP_DI_TYPES.libTwo);
      }
   })
   public libTwoCurator: IContainerAccessStrategy<ILibrary>;

   public myProp: IContainerAccessStrategy<ILibrary>;
}
