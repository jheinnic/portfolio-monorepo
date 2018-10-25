import {injectable} from 'inversify';

import {
   availableExport, DI_COMMON_TAGS, IContainerAccessStrategy, installerResponse
} from '../../../../src';

import {IWidget} from '../../interfaces';
import {FIXTURE_TYPES} from '../types';

@installerResponse()
@injectable()
export class WidgetOneModuleResponse
{
   constructor(partial: Partial<WidgetOneModuleResponse>)
   {
      Object.assign(this, partial);
   }

   @availableExport(
      FIXTURE_TYPES.Widget,
      {
         type: 'tagged',
         key: DI_COMMON_TAGS.VariantFor,
         value: FIXTURE_TYPES.Application
      }
   )
   public widgetOut: IContainerAccessStrategy<IWidget>;
}
