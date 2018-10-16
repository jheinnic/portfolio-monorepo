import {interfaces} from 'inversify';
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import BindingWhenSyntax = interfaces.BindingWhenSyntax;

import {IDirectorFunction} from '@jchptf/api';
import {CompositeBinding} from './composite-binding.class';
import {CompositeBindingBuilder} from './composite-binding-builder.interface';

export function toCompoundDirector<T>(
   parentDirector: IDirectorFunction<BindingWhenSyntax<T>|BindingWhenOnSyntax<T>>,
   hostDirector: IDirectorFunction<BindingWhenOnSyntax<T>>
): IDirectorFunction<BindingWhenOnSyntax<T>>
{
    return (hostBuilder: BindingWhenOnSyntax<T>) => {
        const compositeHelper = new CompositeBinding(hostBuilder);
        compositeHelper.apply((builder: CompositeBindingBuilder<T>) => {
            builder.bindHost(hostDirector)
               .bindParent(parentDirector);
        });
    }
}