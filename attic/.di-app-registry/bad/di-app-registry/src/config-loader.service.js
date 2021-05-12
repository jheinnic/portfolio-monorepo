"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const class_transformer_validator_1 = require("class-transformer-validator");
const metadata_1 = require("@loopback/metadata");
require("@jchptf/reflection");
const config_class_marker_interface_1 = require("./decorators/config-class-marker.interface");
const config_property_marker_interface_1 = require("./decorators/config-property-marker.interface");
let ConfigLoader = class ConfigLoader {
    constructor() {
        require('dotenv').config();
        console.log(`Bootstrapping configuration with:
   ** NODE_CONFIG_DIR=${process.env['NODE_CONFIG_DIR']}
   ** NODE_ENV=${process.env['NODE_ENV']}`);
        this.config = require('config');
        this.mapToDefaults = new Map();
    }
    getConfig(configClass, rootPath) {
        const defaultRoot = metadata_1.MetadataInspector.getClassMetadata(config_class_marker_interface_1.CONFIG_CLASS_MARKER_KEY, configClass);
        const actualRoot = (!!rootPath) ? rootPath
            : ((!!defaultRoot) ? defaultRoot.defaultRoot : undefined);
        const propMap = metadata_1.MetadataInspector.getAllPropertyMetadata(config_property_marker_interface_1.CONFIG_PROPERTY_MARKER_KEY, configClass.prototype);
        const resolvedConfig = {};
        if (!!propMap) {
            for (let nextEntry in propMap) {
                const configKey = `${actualRoot}.${propMap[nextEntry].configKey}`;
                resolvedConfig[nextEntry] = this.config.get(configKey);
            }
        }
        let baseline = this.mapToDefaults.get(configClass);
        if (!baseline) {
            baseline = new configClass();
            this.mapToDefaults.set(configClass, baseline);
        }
        return class_transformer_validator_1.transformAndValidateSync(configClass, Object.assign({}, baseline, resolvedConfig), {
            validator: {
                forbidUnknownValues: true,
                skipMissingProperties: false
            }
        });
    }
};
ConfigLoader = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], ConfigLoader);
exports.ConfigLoader = ConfigLoader;
