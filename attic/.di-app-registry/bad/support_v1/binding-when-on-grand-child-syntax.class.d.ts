import { interfaces } from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import Context = interfaces.Context;
import { BindingWhenGrandChildSyntax } from './index';
export declare class BindingWhenOnGrandChildSyntax<T> extends BindingWhenGrandChildSyntax<T> {
    constructor(grandChildBuilder: BindingWhenSyntax<any>, generationDistance: number);
    onActivation(_fn: (context: Context, injectable: T) => T): BindingWhenSyntax<T>;
}
