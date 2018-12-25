import {interfaces} from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

import {IDirector} from '@jchptf/api';

export interface CompositeBindingBuilder<T> {
   bindHost(director: IDirector<BindingWhenSyntax<T>>, supportsOn?: false): CompositeBindingBuilder<T>;
   bindHost(director: IDirector<BindingWhenOnSyntax<T>>, supportsOn: true): CompositeBindingBuilder<T>;
   bindParent(director: IDirector<BindingWhenSyntax<T>>): CompositeBindingBuilder<T>;
   bindAncestor(generationDistance: number, director: IDirector<BindingWhenSyntax<T>>): CompositeBindingBuilder<T>;
}