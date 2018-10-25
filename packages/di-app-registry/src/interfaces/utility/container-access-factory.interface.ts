import {interfaces} from 'inversify';
import {IContainerAccessStrategy} from '..';

export interface IContainerAccessFactory {
   bound<T>(id: interfaces.ServiceIdentifier<T>): IContainerAccessStrategy<T>;
   boundNamed<T>(id: interfaces.ServiceIdentifier<T>, name: PropertyKey): IContainerAccessStrategy<T>;
   boundTagged<T>(id: interfaces.ServiceIdentifier<T>, tag: PropertyKey, value: any): IContainerAccessStrategy<T>;
   multiBound<T>(id: interfaces.ServiceIdentifier<T>): IContainerAccessStrategy<T[]>;
}