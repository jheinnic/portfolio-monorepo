"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("@loopback/metadata");
const config_class_marker_interface_1 = require("./config-class-marker.interface");
const di_app_registry_1 = require("@jchptf/di-app-registry");
function configClass(defaultRoot, diType) {
    const delegate = metadata_1.ClassDecoratorFactory.createDecorator(config_class_marker_interface_1.CONFIG_CLASS_MARKER_KEY, { defaultRoot, diType });
    if (!diType) {
        return delegate;
    }
    return (target) => {
        delegate(target);
        const registry = di_app_registry_1.ContainerRegistry.getInstance();
        registry.registerConfig(target, diType);
    };
}
exports.configClass = configClass;
