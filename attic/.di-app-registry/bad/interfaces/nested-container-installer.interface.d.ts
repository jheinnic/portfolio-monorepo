import { ContainerAccessStrategy } from './context-transform-function.interface';
export interface NestedContainerAgent {
    chainDynamicBind<T>(contextFunction: ContainerAccessStrategy<T>): T;
}
