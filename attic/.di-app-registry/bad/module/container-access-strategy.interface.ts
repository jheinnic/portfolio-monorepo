import {interfaces} from 'inversify';
import {AnyFunc, False, True} from 'simplytyped';

import {NestedContainerIdentifier} from '../../src/interfaces/index';

export type IContainerAccessStrategy<T> = {
   (context: interfaces.Container): T;
   containerId?: NestedContainerIdentifier;
}

export type IsContainerAccessStrategy<T extends AnyFunc> =
   T extends IContainerAccessStrategy<T> ? True : False;

export function isContainerAccessStrategy<T>(func: AnyFunc): func is IContainerAccessStrategy<T> {
   return func.hasOwnProperty('containerId');
}

