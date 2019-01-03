import { NestedContainerAgent } from './nested-container-installer.interface';
export interface INestedContainerBindingSyntax<C extends NestedContainerAgent> {
    to(installer: {
        new (...args: any[]): C;
    }): void;
}
