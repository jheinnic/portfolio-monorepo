import {injectable} from 'inversify';
import {installerRequest} from '../../../../src/decorators';

@injectable()
@installerRequest()
export class LibraryModuleRequest {
   // bindWhen: IDirectorFunction<BindingWhenSyntax<ILibrary>>;

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
