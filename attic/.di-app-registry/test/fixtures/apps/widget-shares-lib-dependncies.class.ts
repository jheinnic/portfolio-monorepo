import {inject, injectable, tagged} from 'inversify';
import {DI_COMMON_TAGS} from '../../../src/di';
import {FIXTURE_TYPES} from '../di/types';
import {ILibrary} from '../interfaces/library.interface';
import {APP_DI_TYPES} from './widget-shares-lib-one.app';
import {IWidget} from '../interfaces/widget.interface';

@injectable()
export class WidgetSharesLibDependencies {
   constructor(
      @tagged(DI_COMMON_TAGS.CuratorOf, APP_DI_TYPES.libOne) @inject(FIXTURE_TYPES.Library) _libOne: ILibrary,
      @tagged(DI_COMMON_TAGS.CuratorOf, APP_DI_TYPES.libTwo) @inject(FIXTURE_TYPES.Library) _libTwo: ILibrary,
      @tagged(DI_COMMON_TAGS.CuratorOf, APP_DI_TYPES.libThree) @inject(FIXTURE_TYPES.Library) _libThree: ILibrary,
      @tagged(DI_COMMON_TAGS.CuratorOf, FIXTURE_TYPES.Application) @inject(FIXTURE_TYPES.Library) _widgetOne: IWidget
   ) {
   }
}