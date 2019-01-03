import { interfaces } from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import { UnsupportedBindingWhenSyntax } from './unsupported-binding-when-syntax.class';
export declare abstract class UnsupportedBindingWhenOnSyntax<T> extends UnsupportedBindingWhenSyntax<T> implements BindingWhenOnSyntax<T> {
    onActivation(_fn: (context: interfaces.Context, injectable: T) => T): interfaces.BindingWhenSyntax<T>;
}
