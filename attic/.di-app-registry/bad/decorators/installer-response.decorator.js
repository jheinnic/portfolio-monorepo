"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("@loopback/metadata");
exports.INSTALLER_RESPONSE_KEY = metadata_1.MetadataAccessor.create('installer-response-class-key');
/**
 * Decorator for a class used by an Installer class to send back helper functions
 * intended to be used to support provisioning of Dynamic Binding constraints in the
 * consumer's container and according to his or her own disambiguation semantics.
 *
 * Has no stateful properties at this moment and just serves as a marker to enable
 * value add framework processing.
 */
function installerResponse() {
    return metadata_1.ClassDecoratorFactory.createDecorator(exports.INSTALLER_RESPONSE_KEY, {});
}
exports.installerResponse = installerResponse;
