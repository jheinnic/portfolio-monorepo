import {injectable, interfaces} from 'inversify';

import {IDirector} from '@jchptf/api';
import {installerRequest} from '../../../../src/decorators';
import {ILibrary} from '../../interfaces';

@injectable()
@installerRequest()
export class LibraryModuleRequest {

   bindWhen: IDirector<interfaces.BindingWhenSyntax<ILibrary>>;

   // @requiredImport(
   //    FIXTURE_TYPES.Library,
   //    { type: 'tagged', key: DI_COMMON_TAGS.VariantFor, value: APP_DI_TYPES.libOne },
   //    'Singleton'
   // )
   public initialValue: number;

   constructor( partial: Partial<LibraryModuleRequest> ) {
      Object.assign(this, partial);
   }
}
