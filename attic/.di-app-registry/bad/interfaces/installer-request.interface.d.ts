import { IContainerRegistryInstallerClient } from './container-registry-installer.interface';
export interface InstallerRequest<In, Out> {
    install(client: IContainerRegistryInstallerClient, imports: In): Out;
}
