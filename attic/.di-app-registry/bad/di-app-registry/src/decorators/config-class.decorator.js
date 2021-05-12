"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("@loopback/metadata");
const config_class_marker_interface_1 = require("./config-class-marker.interface");
const container_registry_service_1 = require("../container-registry.service");
function configClass(defaultRoot, diType) {
    const delegate = metadata_1.ClassDecoratorFactory.createDecorator(config_class_marker_interface_1.CONFIG_CLASS_MARKER_KEY, { defaultRoot, diType });
    if (!diType) {
        return delegate;
    }
    return (target) => {
        delegate(target);
        const registry = container_registry_service_1.ContainerRegistry.getInstance();
        registry.registerConfig(target, diType);
    };
}
exports.configClass = configClass;
