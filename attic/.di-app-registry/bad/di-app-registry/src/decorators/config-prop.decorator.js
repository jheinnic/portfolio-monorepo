"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("@loopback/metadata");
const config_property_marker_interface_1 = require("./config-property-marker.interface");
function configProp(configKey) {
    return metadata_1.PropertyDecoratorFactory.createDecorator(config_property_marker_interface_1.CONFIG_PROPERTY_MARKER_KEY, { configKey });
}
exports.configProp = configProp;
