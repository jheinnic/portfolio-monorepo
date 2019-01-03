import { interfaces } from 'inversify';
import { MetadataAccessor } from '@loopback/metadata';
import { Discriminator } from './discriminator';
export interface RequiredImport<T> {
    serviceIdentifier: interfaces.ServiceIdentifier<T>;
    bindingScope?: interfaces.BindingScope;
    discriminator: Discriminator;
}
export declare const REQUIRED_IMPORT_KEY: MetadataAccessor<RequiredImport<any>, PropertyDecorator>;
/**
 * Decorator for a Fn<Context, T> property that marks its purpose as being
 * for the selection of a dependency provided by the installing party for use
 * by the installed container module.
 */
export declare function requiredImport<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, discriminator: Discriminator, bindingScope?: interfaces.BindingScope): PropertyDecorator;
