"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("@loopback/metadata");
exports.IMPORT_CONSTRAINT_KEY = metadata_1.MetadataAccessor.create('import-constraint-property-key');
/**
 * Decorator for a Fn<Context, T> property that marks its purpose as being
 * for the selection of a dependency provided by the installing party for use
 * by the installed container module.
 * @param spec
 */
function importConstraint(spec) {
    return metadata_1.PropertyDecoratorFactory.createDecorator(exports.IMPORT_CONSTRAINT_KEY, spec);
}
exports.importConstraint = importConstraint;
