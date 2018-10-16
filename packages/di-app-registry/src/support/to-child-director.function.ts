import {interfaces} from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

import {IDirector} from '@jchptf/api';
import {BindingWhenOnChildSyntax} from './binding-when-on-child-syntax.class';

export function toChildDirector<T>(
   parentDirector: IDirector<BindingWhenSyntax<T>|BindingWhenOnSyntax<T>>
): IDirector<BindingWhenSyntax<any>>
{
    return (childBuilder: BindingWhenSyntax<any>) => {
        const parentBuilder = new BindingWhenOnChildSyntax<T>(childBuilder);
        parentDirector(parentBuilder);
    }
}