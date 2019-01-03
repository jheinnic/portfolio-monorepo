import { interfaces } from 'inversify';
import { IDirector } from '@jchptf/api';
export declare function toChildDirector<T>(parentDirector: IDirector<interfaces.BindingWhenSyntax<T>>): IDirector<interfaces.BindingWhenSyntax<any>>;
