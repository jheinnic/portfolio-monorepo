import { NestedContainerIdentifier } from './nested-container-identifier.interface';
export interface IContainerRegistryInstallerClient {
    toChildContainer(id: NestedContainerIdentifier): any;
}
