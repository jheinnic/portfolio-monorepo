import { interfaces } from 'inversify';
import { MetadataAccessor } from '@loopback/metadata';
import { Discriminator } from './discriminator';
export interface AvailableExport<T> {
    serviceIdentifier: interfaces.ServiceIdentifier<T>;
    discriminator: Discriminator;
}
export declare const AVAILABLE_EXPORT_KEY: MetadataAccessor<AvailableExport<any>, PropertyDecorator>;
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
export declare function availableExport<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, discriminator: Discriminator): PropertyDecorator;
