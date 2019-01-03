import { MetadataAccessor } from '@loopback/metadata';
export interface InstallerRequest {
}
export declare const INSTALLER_REQUEST_KEY: MetadataAccessor<InstallerRequest, ClassDecorator>;
/**
 * Decorator for a class used by an Installer class to accept input params that marks it
 * for inspection for @importConstraint property decorators for the ContainerRegistry to
 * provide runtime support for.
 *
 * Has no stateful properties at this moment and just serves as a marker.
 */
export declare function installerRequest(): ClassDecorator;
