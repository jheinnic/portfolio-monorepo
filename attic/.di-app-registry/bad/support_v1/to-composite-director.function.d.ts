import { interfaces } from 'inversify';
import { IDirector } from '@jchptf/api';
export declare function toCompositeDirector<T>(parentDirector: IDirector<interfaces.BindingWhenSyntax<T>>, hostDirector: IDirector<interfaces.BindingWhenOnSyntax<T>>): IDirector<interfaces.BindingWhenOnSyntax<T>>;
