import {MetadataAccessor, MethodDecoratorFactory} from '@loopback/metadata';

export interface InstallerMethod { }

export const INSTALLER_METHOD_KEY =
   MetadataAccessor.create<InstallerMethod, MethodDecorator>(
      'installer-method-property-key');

/**
 * Decorator for a Fn<Context, T> property that marks its purpose as being
 * for the selection of a dependency provided by the installing party for use
 * by the installed container module.
 */
export function installerMethod(
): MethodDecorator
{
   return MethodDecoratorFactory.createDecorator<InstallerMethod>(
      INSTALLER_METHOD_KEY, { });
}
