import {interfaces} from 'inversify';

import {IDirector} from '@jchptf/api';
import {BindingWhenChildSyntax} from './binding-when-child-syntax.class';

export function toChildDirector<Parent, Child>(
   parentDirector: IDirector<interfaces.BindingWhenSyntax<Parent>>
): IDirector<interfaces.BindingWhenSyntax<Child>>
{
    return (childBuilder: interfaces.BindingWhenSyntax<Child>) => {
        const parentBuilder = new BindingWhenChildSyntax<Parent, Child>(childBuilder);
        parentDirector(parentBuilder);
    }
}