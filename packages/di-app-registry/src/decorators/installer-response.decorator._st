import {ClassDecoratorFactory, MetadataAccessor} from '@loopback/metadata';

export interface InstallerResponse { }

export const INSTALLER_RESPONSE_KEY =
   MetadataAccessor.create<InstallerResponse, ClassDecorator>(
      'installer-response-class-key');

/**
 * Decorator for a class used by an Installer class to send back helper functions
 * intended to be used to support provisioning of Dynamic Binding constraints in the
 * consumer's container and according to his or her own disambiguation semantics.
 *
 * Has no stateful properties at this moment and just serves as a marker to enable
 * value add framework processing.
 */
export function installerResponse(): ClassDecorator
{
   return ClassDecoratorFactory.createDecorator<InstallerResponse>(
      INSTALLER_RESPONSE_KEY, {});
}
