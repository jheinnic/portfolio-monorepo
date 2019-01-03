import { IContainerAccessStrategy } from './container-access-strategy.interface';
export interface INestedContainerAgent {
    evaluate<T>(accessRequest: IContainerAccessStrategy<T>): T;
}
