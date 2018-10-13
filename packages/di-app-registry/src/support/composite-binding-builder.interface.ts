import {interfaces} from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

import {IDirector} from '@jchptf/api';

export interface CompositeBindingBuilder<T> {
   bindHost(director: IDirector<BindingWhenOnSyntax<T>|BindingWhenSyntax<T>>): CompositeBindingBuilder<T>;
   bindParent(director: IDirector<BindingWhenOnSyntax<any>|BindingWhenSyntax<any>>): CompositeBindingBuilder<T>;
   bindAncestor(generationDistance: number, director: IDirector<BindingWhenOnSyntax<any>|BindingWhenSyntax<any>>): CompositeBindingBuilder<T>;
}