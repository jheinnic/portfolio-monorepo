"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const errors_1 = require("@thi.ng/errors");
let ContainerRegistryInstallerClient = class ContainerRegistryInstallerClient {
    constructor(registryInternal) {
        this.registryInternal = registryInternal;
    }
    getConfig(configClass, rootPath) {
        return this.registryInternal.getConfig(configClass, rootPath);
    }
    createChild(childId, allowExists = false) {
        if (!childId) {
            throw new errors_1.IllegalArgumentError('childId is a mandatory argument');
        }
        if (this.registryInternal.hasNestedContainer(childId)) {
            if (!allowExists) {
                throw new errors_1.IllegalArgumentError(`A child container already exists for ${childId.toString()}, and allowExists flag is not true.`);
            }
        }
        else {
            this.registryInternal.createNestedContainer(childId);
        }
        return this;
    }
    fromChild(childId, director) {
        this.registryInternal.enterNestedContainer(childId);
        try {
            director(this);
        }
        finally {
            this.registryInternal.exitNestedContainer(childId);
        }
        return this;
    }
    load(callback) {
        if (!callback) {
            throw new errors_1.IllegalArgumentError('callback must be defined');
        }
        this.registryInternal.loadModule(callback);
        return this;
    }
    loadFromChild(childId, callback, allowCreate = false) {
        if (!childId || !callback) {
            throw new errors_1.IllegalArgumentError('childId and callback are both mandatory arguments');
        }
        this.validateChildId(childId, allowCreate);
        this.registryInternal.enterNestedContainer(childId);
        try {
            this.registryInternal.loadModule(callback);
        }
        finally {
            this.registryInternal.exitNestedContainer(childId);
        }
        return this;
    }
    install(installerId, requestBody) {
        if (!installerId || !requestBody) {
            throw new errors_1.IllegalArgumentError('installerId and requestBody are both mandatory arguments');
        }
        const retVal = this.registryInternal
            .runInstaller(installerId, requestBody);
        return this.registryInternal
            .scanExports(retVal);
    }
    installFromChild(childId, installerId, requestBody, allowCreate = false) {
        if (!childId || !installerId || !requestBody) {
            throw new errors_1.IllegalArgumentError('childId, installerId, and requestBody are all mandatory arguments');
        }
        this.validateChildId(childId, allowCreate);
        let retVal;
        this.registryInternal.enterNestedContainer(childId);
        try {
            retVal = this.registryInternal
                .runInstaller(installerId, requestBody);
        }
        finally {
            this.registryInternal.exitNestedContainer(childId);
        }
        return this.registryInternal
            .scanExports(retVal);
    }
    adaptFromChild(childId, accessStrategy, trustUntagged = false) {
        if (!childId || !accessStrategy) {
            throw new errors_1.IllegalArgumentError('childId and accessStrategy are both mandatory arguments');
        }
        if (!this.registryInternal.hasNestedContainer(childId)) {
            throw new errors_1.IllegalArgumentError(`Cannot adapt access strategy.  ${childId.toString()} has no child container.`);
        }
        if ((accessStrategy.containerId === childId) ||
            (trustUntagged && (accessStrategy.containerId === undefined))) {
            // TODO: Provide a containerId for the current container, including root!
            const retVal = (container) => {
                const childContainer = container.get(childId);
                return accessStrategy(childContainer);
            };
            retVal.containerId = undefined;
            return retVal;
        }
        else if (accessStrategy.containerId === undefined) {
            throw new errors_1.IllegalArgumentError('Untagged access strategy and trustUntagged flag not true');
        }
        throw new errors_1.IllegalArgumentError(`Access strategy, ${accessStrategy.containerId.toString()}, does not match ${childId.toString()}`);
    }
    adaptForChild(childId, grandChildId, grandChildAccessStrategy, trustUntagged) {
        if (!childId || !grandChildId || !grandChildAccessStrategy) {
            throw new errors_1.IllegalArgumentError('childId, grandChildId, and grandChildAccessStrategy are all mandatory arguments');
        }
        if (!this.registryInternal.hasNestedContainer(childId)) {
            throw new errors_1.IllegalArgumentError(`Cannot adapt access strategy.  ${childId.toString()} has no child container.`);
        }
        this.registryInternal.enterNestedContainer(childId);
        try {
            if (!this.registryInternal.hasNestedContainer(grandChildId)) {
                throw new errors_1.IllegalArgumentError(`Cannot adapt access strategy.  ${childId.toString()} has no grandchild container.`);
            }
            return this.adaptFromChild(grandChildId, grandChildAccessStrategy, trustUntagged);
        }
        finally {
            this.registryInternal.exitNestedContainer(childId);
        }
    }
    /**
     *
     * Note that:
     * -- If allowCreate is false, this method will either return true or throw, but will
     *    never return false.
     * -- If allowCreate is true, this method will either return true or return false, but
     *    will never throw.
     *
     * @param childId Identifier to check for
     * @param allowCreate True if container may be created if it does not exist, false if
     * non-existence calls for a thrown error.
     * @returns True if the child container already exists, false if it did not exist but
     * was created by this call.
     */
    validateChildId(childId, allowCreate) {
        let retVal = true;
        if (!this.registryInternal.hasNestedContainer(childId)) {
            if (allowCreate) {
                this.registryInternal.createNestedContainer(childId);
                retVal = false;
            }
            else {
                throw new errors_1.IllegalStateError(`No child container for ${childId.toString()}, and allowCreate flag not true.`);
            }
        }
        return retVal;
    }
};
ContainerRegistryInstallerClient = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(types_1.DI_TYPES.ContainerRegistryInternal)),
    tslib_1.__metadata("design:paramtypes", [Object])
], ContainerRegistryInstallerClient);
exports.ContainerRegistryInstallerClient = ContainerRegistryInstallerClient;
