import {interfaces} from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import {IDirector} from '@jchptf/api';
import {ILibrary} from '../../interfaces/library.interface';

export interface WidgetOneModuleOptions {
   bindWhen: IDirector<BindingWhenSyntax<ILibrary>>;

   initialValue: number;
}