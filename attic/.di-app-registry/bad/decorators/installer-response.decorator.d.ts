import { MetadataAccessor } from '@loopback/metadata';
export interface InstallerResponse {
}
export declare const INSTALLER_RESPONSE_KEY: MetadataAccessor<InstallerResponse, ClassDecorator>;
/**
 * Decorator for a class used by an Installer class to send back helper functions
 * intended to be used to support provisioning of Dynamic Binding constraints in the
 * consumer's container and according to his or her own disambiguation semantics.
 *
 * Has no stateful properties at this moment and just serves as a marker to enable
 * value add framework processing.
 */
export declare function installerResponse(): ClassDecorator;
