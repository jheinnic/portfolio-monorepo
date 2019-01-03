import { interfaces } from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import { IDirector } from '@jchptf/api';
export declare function toCompoundDirector<T>(parentDirector: IDirector<BindingWhenSyntax<T> | BindingWhenOnSyntax<T>>, hostDirector: IDirector<BindingWhenOnSyntax<T>>): IDirector<BindingWhenOnSyntax<T>>;
