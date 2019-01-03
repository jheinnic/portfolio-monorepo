import { IContainerRegistryInstallerClient } from './container-registry-installer-client.interface';
export interface InstallerService<In extends any, Out extends any> {
    install(client: IContainerRegistryInstallerClient, imports: In): Out;
}
