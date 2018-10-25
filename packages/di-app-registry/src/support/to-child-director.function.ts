import {interfaces} from 'inversify';

import {IDirector} from '@jchptf/api';
import {BindingWhenOnChildSyntax} from './binding-when-on-child-syntax.class';

export function toChildDirector<T>(
   parentDirector: IDirector<interfaces.BindingWhenSyntax<T>>
): IDirector<interfaces.BindingWhenSyntax<any>>
{
    return (childBuilder: interfaces.BindingWhenSyntax<any>) => {
        const parentBuilder = new BindingWhenOnChildSyntax<T>(childBuilder);
        parentDirector(parentBuilder);
    }
}