import {interfaces} from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

import {IDirectorFunction} from '@jchptf/api';

export interface CompositeBindingBuilder<T> {
   bindHost(director: IDirectorFunction<BindingWhenOnSyntax<T>|BindingWhenSyntax<T>>): CompositeBindingBuilder<T>;
   bindParent(director: IDirectorFunction<BindingWhenOnSyntax<any>|BindingWhenSyntax<any>>): CompositeBindingBuilder<T>;
   bindAncestor(generationDistance: number, director: IDirectorFunction<BindingWhenOnSyntax<any>|BindingWhenSyntax<any>>): CompositeBindingBuilder<T>;
}