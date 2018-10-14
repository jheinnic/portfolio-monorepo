import {interfaces} from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import {IDirector} from '@jchptf/api';
import {IWidget} from '../../interfaces/widget.interface';

export interface WidgetOneModuleOptions {
   bindWhen: IDirector<BindingWhenSyntax<IWidget>>;
   libOneCurator?: symbol;
   libTwoCurator?: symbol;
}