import { MetadataAccessor } from '@loopback/metadata';
import { interfaces } from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import { ImportDiscriminator } from './discriminators/index';
export interface ImportConstraint<T> {
    serviceIdentifier: ServiceIdentifier<T>;
    bindingScope?: interfaces.BindingScope;
    discriminator: ImportDiscriminator;
}
export declare const IMPORT_CONSTRAINT_KEY: MetadataAccessor<ImportConstraint<any>, PropertyDecorator>;
/**
 * Decorator for a Fn<Context, T> property that marks its purpose as being
 * for the selection of a dependency provided by the installing party for use
 * by the installed container module.
 * @param spec
 */
export declare function importConstraint<T>(spec: ImportConstraint<T>): PropertyDecorator;
