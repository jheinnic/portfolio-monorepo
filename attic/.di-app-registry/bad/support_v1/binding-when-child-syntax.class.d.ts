import { interfaces } from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import BindingOnSyntax = interfaces.BindingOnSyntax;
import Request = interfaces.Request;
export declare class BindingWhenChildSyntax<T> implements BindingWhenSyntax<T> {
    private readonly childBuilder;
    private noOpBinding;
    constructor(childBuilder: BindingWhenSyntax<any>);
    when(constraint: (parentRequest: Request) => boolean): BindingOnSyntax<T>;
    whenAnyAncestorIs(ancestor: Function | string): BindingOnSyntax<T>;
    whenAnyAncestorMatches(constraint: (request: Request) => boolean): BindingOnSyntax<T>;
    whenAnyAncestorNamed(name: string | number | symbol): BindingOnSyntax<T>;
    whenAnyAncestorTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>;
    whenInjectedInto(parent: Function | string): BindingOnSyntax<T>;
    whenNoAncestorIs(ancestor: Function | string): BindingOnSyntax<T>;
    whenNoAncestorMatches(constraint: (request: Request) => boolean): interfaces.BindingOnSyntax<T>;
    whenNoAncestorNamed(name: string | number | symbol): BindingOnSyntax<T>;
    whenNoAncestorTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>;
    whenParentNamed(name: string | number | symbol): BindingOnSyntax<T>;
    whenParentTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>;
    whenTargetIsDefault(): BindingOnSyntax<T>;
    whenTargetNamed(name: string | number | symbol): BindingOnSyntax<T>;
    whenTargetTagged(tag: string | number | symbol, value: any): BindingOnSyntax<T>;
}
