"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InstallerModuleBuilder {
    constructor(bind) {
        this.bind = bind;
    }
    bindApplication(applicationIdentifier, applicationInstaller) {
        this.bind(applicationIdentifier)
            .to(applicationInstaller);
    }
    bindInstaller(installRequestIdentifier, requestConstructor, installServiceIdentifier, serviceConstructor) {
        this.bind(installRequestIdentifier)
            .toConstructor(requestConstructor);
        this.bind(installServiceIdentifier)
            .to(serviceConstructor)
            .inSingletonScope();
    }
}
exports.InstallerModuleBuilder = InstallerModuleBuilder;
