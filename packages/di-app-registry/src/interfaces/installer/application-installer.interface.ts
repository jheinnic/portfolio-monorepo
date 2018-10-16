import {IContainerRegistryInstallerClient} from './container-registry-installer-client.interface';

export interface ApplicationInstaller {
   install(client: IContainerRegistryInstallerClient): void;
}
