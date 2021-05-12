"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const dcons_1 = require("@thi.ng/dcons");
const errors_1 = require("@thi.ng/errors");
const types_1 = require("./types");
const installer_module_builder_class_1 = require("./installer-module-builder.class");
const installer_annotation_processor_class_1 = require("./installer-annotation-processor.class");
const container_registry_installer_client_class_1 = require("./container-registry-installer-client.class");
const config_loader_service_1 = require("./config-loader.service");
// import {nestedContainerExportMiddleware} from './nested-container-export-middleware.function';
class ContainerRegistry {
    constructor() {
        this.installerContainer = new inversify_1.Container({
            autoBindInjectable: false,
            defaultScope: 'Singleton',
            skipBaseClassChecks: true
        });
        this.applicationContainer = new inversify_1.Container();
        this.currentAppContainer = this.applicationContainer;
        this.parentContainerStack = new dcons_1.DCons();
        // this.applicationContainer.applyMiddleware(
        //    nestedContainerExportMiddleware
        // );
        this.installerAnnotationProcessor = new installer_annotation_processor_class_1.InstallerAnnotationProcessor();
        this.installerClient = new container_registry_installer_client_class_1.ContainerRegistryInstallerClient(this);
    }
    static getInstance() {
        return this.INSTANCE;
    }
    get(injectLabel) {
        return this.applicationContainer.get(injectLabel);
    }
    registerInstallers(...installerCallback) {
        this.installerContainer.load(...installerCallback.map((callback) => new inversify_1.ContainerModule((bind) => {
            const installerModuleBuilder = new installer_module_builder_class_1.InstallerModuleBuilder(bind);
            callback(installerModuleBuilder);
        })));
    }
    // public registerAsyncInstallers(...installerCallback: [interfaces.AsyncContainerModuleCallBack]):
    // Promise<void> { return this.installerContainer.loadAsync( ...installerCallback.map(
    // function(callback: interfaces.AsyncContainerModuleCallBack): AsyncContainerModule { return new
    // AsyncContainerModule(callback); })); }
    installApplication(applicationLoader) {
        const appInstaller = this.installerContainer.get(applicationLoader);
        if (!appInstaller) {
            throw errors_1.illegalArgs('Unable to load application callback from installation container');
        }
        if (this.currentAppContainer != this.applicationContainer) {
            throw errors_1.illegalState('Container stack must be unwound to root before loading an application');
        }
        console.log('Loading App');
        appInstaller.install(this.installerClient);
        console.log('Done Loading');
        // while (this.installerContainer.isBound(DI_TYPES.ContainerModuleCallBack)) {
        //    const nextBatch = this.installerContainer.getAll(DI_TYPES.ContainerModuleCallBack);
        //    this.installerContainer.unbind(DI_TYPES.ContainerModuleCallBack);
        //    nextBatch.forEach(
        //       (callBack: interfaces.ContainerModuleCallBack) => {
        // console.log('Loading a dependency');
        // this.applicationContainer.load(
        //    new ContainerModule(callBack))
        // }
        // );
        // console.log('End of round');
        // }
        // console.log('Done Loading');
    }
    getConfig(configClass, rootPath) {
        // Defer installation until first request to allow all config class imports to have
        // taken place.
        if (!this.installerContainer.isBound(types_1.DI_TYPES.ConfigLoader)) {
            this.installerContainer.bind(types_1.DI_TYPES.ConfigLoader)
                .to(config_loader_service_1.ConfigLoader)
                .inSingletonScope();
        }
        const configLoader = this.installerContainer.get(types_1.DI_TYPES.ConfigLoader);
        return configLoader.getConfig(configClass, rootPath);
    }
    createNestedContainer(containerKey) {
        const newChild = this.currentAppContainer.createChild();
        this.currentAppContainer.bind(containerKey)
            .toConstantValue(newChild);
    }
    hasNestedContainer(containerKey) {
        return this.currentAppContainer.isBound(containerKey);
    }
    enterNestedContainer(containerKey) {
        const nextContainer = this.currentAppContainer.get(containerKey);
        this.currentAppContainer.bind(types_1.DI_TYPES.NestedContainer)
            .toConstantValue(nextContainer)
            .whenTargetTagged(types_1.DI_COMMON_TAGS.ContainerId, containerKey);
        this.parentContainerStack.push(this.currentAppContainer);
        this.currentAppContainer = nextContainer;
    }
    exitNestedContainer(containerKey) {
        if (!this.parentContainerStack.peek()) {
            if (this.currentAppContainer !== this.applicationContainer) {
                errors_1.illegalState(`Absurd state encountered--empty stack, but non-root current container!`);
            }
            errors_1.illegalState(`Cannot complete a nested container with empty container stack!`);
        }
        if (this.currentAppContainer !== this.parentContainerStack.peek()
            .getTagged(types_1.DI_TYPES.NestedContainer, types_1.DI_COMMON_TAGS.ContainerId, containerKey)) {
            errors_1.illegalState(`Cannot pop container named ${containerKey.toString()} because it is not currently top of stack.`);
        }
        this.currentAppContainer =
            this.parentContainerStack.pop();
        // We created a binding to new container when it was created.
        // TODO: This would be the right place to interact with any
        //       content bridging abstraction.  For any well-known key from the
        //       nested container's module contract, support a toDynamic() binding
        //       that is tagged by the 'DI Common' ContainerId Tag with a value
        //       matching the containerKey used to activate the desired container
        //       instance.
        // NOTE: For the time being, it seems advisable to suggest that
        //       Well-known keys used for exposing nested container contents for
        //       import by their parent container must not have a need to disambiguate
        //       multiple instances from the same container (e.g. by Named or Tagged
        //       bindings.)  If two or more instances of the same type MUST be
        //       exposed by a nested container installer type, then the best fallback
        //       suggestion is to use two distinct ServiceId keys to distinguish one
        //       from the other.
    }
    loadModule(result) {
        this.currentAppContainer.load(new inversify_1.ContainerModule(result));
    }
    runInstaller(serviceId, requestMsg) {
        const installService = this.installerContainer.get(serviceId);
        const importLoader = this.installerAnnotationProcessor
            .scanForImportDecorators(requestMsg);
        this.currentAppContainer.load(new inversify_1.ContainerModule(importLoader));
        return installService.install(this.installerClient, requestMsg);
    }
    scanExports(exportMsg) {
        if (!!exportMsg) {
            const exportLoader = this.installerAnnotationProcessor
                .scanForExportDecorators(exportMsg);
            this.currentAppContainer.load(new inversify_1.ContainerModule(exportLoader));
        }
        return exportMsg;
    }
    registerConfig(configClass, serviceIdentifier) {
        this.installerContainer.bind(serviceIdentifier)
            .toDynamicValue((context) => {
            const loader = context.container.get(types_1.DI_TYPES.ConfigLoader);
            return loader.getConfig(configClass);
        });
    }
}
ContainerRegistry.INSTANCE = new ContainerRegistry();
exports.ContainerRegistry = ContainerRegistry;
