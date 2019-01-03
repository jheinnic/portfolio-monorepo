import { interfaces } from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
export declare abstract class UnsupportedBindingWhenSyntax<T> implements BindingWhenSyntax<T> {
    when(_constraint: (parentRequest: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorIs(_ancestor: Function | string): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorMatches(_constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorNamed(_name: string | number | symbol): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorTagged(_tag: string | number | symbol, _value: any): interfaces.BindingOnSyntax<T>;
    whenInjectedInto(_parent: Function | string): interfaces.BindingOnSyntax<T>;
    whenNoAncestorIs(_ancestor: Function | string): interfaces.BindingOnSyntax<T>;
    whenNoAncestorMatches(_constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    whenNoAncestorNamed(_name: string | number | symbol): interfaces.BindingOnSyntax<T>;
    whenNoAncestorTagged(_tag: string | number | symbol, _value: any): interfaces.BindingOnSyntax<T>;
    whenParentNamed(_name: string | number | symbol): interfaces.BindingOnSyntax<T>;
    whenParentTagged(_tag: string | number | symbol, _value: any): interfaces.BindingOnSyntax<T>;
    whenTargetIsDefault(): interfaces.BindingOnSyntax<T>;
    whenTargetNamed(_name: string | number | symbol): interfaces.BindingOnSyntax<T>;
    whenTargetTagged(_tag: string | number | symbol, _value: any): interfaces.BindingOnSyntax<T>;
}
