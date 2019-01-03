import { interfaces } from 'inversify';
import { AnyFunc } from 'simplytyped';
import { NestedContainerIdentifier } from '..';
export declare type IContainerAccessStrategy<T> = {
    (context: interfaces.Container): T;
    containerId?: NestedContainerIdentifier;
};
export declare type IsContainerAccessStrategy<T extends AnyFunc> = T extends IContainerAccessStrategy<T> ? T : never;
