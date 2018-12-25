import {interfaces} from 'inversify';

import {IDirector} from '@jchptf/api';
import {CompositeBinding} from './composite-binding.class';
import {CompositeBindingBuilder} from './composite-binding-builder.interface';

export function toCompositeDirector<T>(
   parentDirector: IDirector<interfaces.BindingWhenSyntax<T>>,
   hostDirector: IDirector<interfaces.BindingWhenSyntax<T>>
): IDirector<interfaces.BindingWhenSyntax<T>>;
export function toCompositeDirector<T>(
   parentDirector: IDirector<interfaces.BindingWhenSyntax<T>>,
   hostDirector: IDirector<interfaces.BindingWhenOnSyntax<T>>,
   supportsOn: true
): IDirector<interfaces.BindingWhenOnSyntax<T>>;
export function toCompositeDirector<T>(
   parentDirector: IDirector<interfaces.BindingWhenSyntax<T>>,
   hostDirector: IDirector<interfaces.BindingWhenSyntax<T>>|IDirector<interfaces.BindingWhenOnSyntax<T>>,
   supportsOn?: true
): IDirector<interfaces.BindingWhenSyntax<T>>|IDirector<interfaces.BindingWhenOnSyntax<T>>
{
    return (hostBuilder: interfaces.BindingWhenOnSyntax<T>) => {
        const compositeHelper = new CompositeBinding(hostBuilder);
        compositeHelper.apply((builder: CompositeBindingBuilder<T>) => {
            builder.bindHost(hostDirector, supportsOn)
               .bindParent(parentDirector);
        });
    }
}