import {injectable} from 'inversify';

import {IWidget} from '../../interfaces';
import {IContainerAccessStrategy} from '../../../../src/interfaces/installer/container-access-strategy.interface';
import {DI_COMMON_TAGS} from '../../../../src/types';
import {FIXTURE_TYPES} from '../types';
import {availableExport, installerResponse} from '../../../../src/decorators';

@installerResponse()
@injectable()
export class WidgetOneModuleResponse {
  constructor( partial: Partial<WidgetOneModuleResponse> ) {
      Object.assign(this, partial);
   }

   @availableExport(
      FIXTURE_TYPES.Widget,
      { type: 'tagged', key: DI_COMMON_TAGS.VariantFor, value: FIXTURE_TYPES.Application }
   )
   public widgetOut: IContainerAccessStrategy<IWidget>;
}
