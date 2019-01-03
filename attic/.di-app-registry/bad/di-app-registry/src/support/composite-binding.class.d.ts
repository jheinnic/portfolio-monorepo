import { interfaces } from 'inversify';
import { IDirector } from '@jchptf/api';
import { CompositeBindingBuilder } from './index';
import BindingWhenSyntax = interfaces.BindingWhenSyntax;
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
export declare class CompositeBinding<T> implements CompositeBindingBuilder<T> {
    private readonly hostBuilder;
    private readonly constraintList;
    constructor(hostBuilder: BindingWhenOnSyntax<T>);
    apply(director: IDirector<CompositeBindingBuilder<T>>): void;
    bindHost(director: IDirector<BindingWhenSyntax<T> | BindingWhenOnSyntax<T>>): CompositeBindingBuilder<T>;
    bindParent(director: IDirector<BindingWhenSyntax<any> | BindingWhenOnSyntax<any>>): CompositeBindingBuilder<T>;
    bindAncestor(generationDistance: number, director: IDirector<BindingWhenSyntax<any> | BindingWhenOnSyntax<any>>): CompositeBindingBuilder<T>;
    private CompositeBindingWhenSyntax;
}
