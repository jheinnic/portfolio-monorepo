import { interfaces } from 'inversify';
import Context = interfaces.Context;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import { BindingWhenChildSyntax } from './index';
export declare class BindingWhenOnChildSyntax<T> extends BindingWhenChildSyntax<T> {
    constructor(childBuilder: BindingWhenSyntax<any>);
    onActivation(_fn: (context: Context, injectable: T) => T): BindingWhenSyntax<T>;
}
