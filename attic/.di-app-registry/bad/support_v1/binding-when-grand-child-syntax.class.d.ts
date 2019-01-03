import { interfaces } from 'inversify';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
export declare class BindingWhenGrandChildSyntax<T> implements BindingWhenSyntax<T> {
    private readonly grandChildBuilder;
    private readonly generationDistance;
    private noOpBinding;
    constructor(grandChildBuilder: BindingWhenSyntax<any>, generationDistance: number);
    when(constraint: (parentRequest: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorIs(ancestor: Function | string): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;
    whenAnyAncestorTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;
    whenInjectedInto(parent: Function | string): interfaces.BindingOnSyntax<T>;
    whenNoAncestorIs(ancestor: Function | string): interfaces.BindingOnSyntax<T>;
    whenNoAncestorMatches(constraint: (request: interfaces.Request) => boolean): interfaces.BindingOnSyntax<T>;
    whenNoAncestorNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;
    whenNoAncestorTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;
    whenParentNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;
    whenParentTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;
    whenTargetIsDefault(): interfaces.BindingOnSyntax<T>;
    whenTargetNamed(name: string | number | symbol): interfaces.BindingOnSyntax<T>;
    whenTargetTagged(tag: string | number | symbol, value: any): interfaces.BindingOnSyntax<T>;
    private getGrandParentRequest;
}
