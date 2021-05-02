import { ApplicationInstaller } from '@jchptf/di-app-registry';
import { IContainerRegistryInstallerClient } from '@jchptf/di-app-registry';
import { ProtoExperiment } from '../../../../src/proto/config/proto-experiment.config';
export declare class ProtoExperimentAppInstaller implements ApplicationInstaller {
    private readonly config;
    constructor(config: ProtoExperiment);
    install(client: IContainerRegistryInstallerClient): void;
}
//# sourceMappingURL=proto-experiment-app-installer.service.d.ts.map