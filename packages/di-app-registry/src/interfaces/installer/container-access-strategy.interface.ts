import {interfaces} from 'inversify';
import {AnyFunc} from 'simplytyped';

import {NestedContainerIdentifier} from '..';

export type IContainerAccessStrategy<T> = {
   (context: interfaces.Container): T;
   containerId?: NestedContainerIdentifier;
}

export type IsContainerAccessStrategy<T extends AnyFunc> =
   T extends IContainerAccessStrategy<T> ? T : never;

