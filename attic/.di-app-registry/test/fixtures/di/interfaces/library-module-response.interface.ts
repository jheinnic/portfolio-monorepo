import {injectable} from 'inversify';
import {availableExport, installerResponse} from '../../../../src/decorators';
import {ILibrary} from '../../interfaces';
import {FIXTURE_TYPES} from '../types';

/**
 * Not in use--the caller is given bindWhen in the request, so the only property defined
 * here is strictly not needed--it is already redundant.
 */
@injectable()
@installerResponse()
export class LibraryModuleResponse {
   @availableExport( FIXTURE_TYPES.Library, { type: 'fromRequest', path: 'bindWhen' })
   public libInst: ILibrary;

   constructor( partial: Partial<LibraryModuleResponse> ) {
      Object.assign(this, partial);
   }
}
