"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("@loopback/metadata");
exports.REQUIRED_IMPORT_KEY = metadata_1.MetadataAccessor.create('required-import-property-key');
/**
 * Decorator for a Fn<Context, T> property that marks its purpose as being
 * for the selection of a dependency provided by the installing party for use
 * by the installed container module.
 */
function requiredImport(serviceIdentifier, discriminator, bindingScope = "Singleton") {
    return metadata_1.PropertyDecoratorFactory.createDecorator(exports.REQUIRED_IMPORT_KEY, { serviceIdentifier, bindingScope, discriminator });
}
exports.requiredImport = requiredImport;
