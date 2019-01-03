import { interfaces } from 'inversify';
import { MetadataAccessor } from '@loopback/metadata';
import { ExportDiscriminator } from './discriminators/index';
export interface ExportDirective<T> {
    serviceIdentifier: interfaces.ServiceIdentifier<T>;
    discriminator: ExportDiscriminator;
}
export declare const EXPORT_DIRECTIVE_KEY: MetadataAccessor<ExportDirective<any>, PropertyDecorator>;
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
 * @param spec
 */
export declare function exportDirective<T>(spec: ExportDirective<T>): PropertyDecorator;
