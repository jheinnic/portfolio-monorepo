import { interfaces } from 'inversify';
import BindingOnSyntax = interfaces.BindingOnSyntax;
export declare class NoOpBindingOn<T> implements BindingOnSyntax<T> {
    private readonly parentBuilder;
    constructor(parentBuilder: interfaces.BindingWhenSyntax<T>);
    onActivation(_fn: (context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>;
}
