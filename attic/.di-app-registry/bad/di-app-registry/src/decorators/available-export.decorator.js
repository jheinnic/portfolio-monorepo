"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("@loopback/metadata");
exports.AVAILABLE_EXPORT_KEY = metadata_1.MetadataAccessor.create('available-export-property-key');
/**
 * Decorator for a Fn<Context, T> property that marks its purpose as for providing
 * access to an artifact exported by the installer module whose installer returned
 * the object it appears on.  Recipient is responsible for applying this function
 * to the correct Container if the installer module has been expanded in a child
 * container for isolation purposes.
 *
 * This is especially true if the dependency is being passed into a different
 * child container.  The simplest way to address this is to wrap the attached
 * function with the adapter factory method for to-child-container traversal,
 * providing the correct container identity key as an argument.
 *
 * This decorator describes the location the function will retrieve the artifact
 * from, which enables the framework to create that function itself as needed.
 */
function availableExport(serviceIdentifier, discriminator) {
    return metadata_1.PropertyDecoratorFactory.createDecorator(exports.AVAILABLE_EXPORT_KEY, { serviceIdentifier, discriminator });
}
exports.availableExport = availableExport;
