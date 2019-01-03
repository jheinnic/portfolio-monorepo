import { IContainerAccessFactory } from './interfaces/utility/container-access-factory.interface';
import { IContainerAccessStrategy } from './interfaces';
import { interfaces } from 'inversify';
export declare class ContainerAccessFactory implements IContainerAccessFactory {
    bound<T>(id: interfaces.ServiceIdentifier<T>): IContainerAccessStrategy<T>;
    boundNamed<T>(id: interfaces.ServiceIdentifier<T>, name: PropertyKey): IContainerAccessStrategy<T>;
    boundTagged<T>(id: interfaces.ServiceIdentifier<T>, tag: PropertyKey, value: any): IContainerAccessStrategy<T>;
    multiBound<T>(id: interfaces.ServiceIdentifier<T>): IContainerAccessStrategy<T[]>;
}
