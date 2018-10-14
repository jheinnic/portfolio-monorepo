import {interfaces} from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

import {IDirector} from '@jchptf/api';
import {CompositeBinding} from './composite-binding.class';
import {CompositeBindingBuilder} from './composite-binding-builder.interface';

export function toCompoundDirector<T>(
   parentDirector: IDirector<BindingWhenSyntax<T>|BindingWhenOnSyntax<T>>,
   hostDirector: IDirector<BindingWhenOnSyntax<T>>
): IDirector<BindingWhenOnSyntax<T>>
{
    return (hostBuilder: BindingWhenOnSyntax<T>) => {
        const compositeHelper = new CompositeBinding(hostBuilder);
        compositeHelper.apply((builder: CompositeBindingBuilder<T>) => {
            builder.bindHost(hostDirector)
               .bindParent(parentDirector);
        });
    }
}