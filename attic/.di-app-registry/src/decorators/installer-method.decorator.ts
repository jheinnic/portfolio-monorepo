import {MetadataAccessor, MethodDecoratorFactory} from '@loopback/metadata';
import {HostContainerMode} from '../../bad/module/host-container-mode.enum';

export interface InstallerMethod
{
   containerMode: HostContainerMode;
}

export const INSTALLER_METHOD_KEY =
   MetadataAccessor.create<InstallerMethod, MethodDecorator>(
      'installer-method-property-key');

/**
 * Decorator for a Fn<Context, T> property that marks its purpose as being
 * for the selection of a dependency provided by the installing party for use
 * by the installed container module.
 */
export function installerMethod(containerMode: HostContainerMode): MethodDecorator
{
   return MethodDecoratorFactory.createDecorator<InstallerMethod>(
      INSTALLER_METHOD_KEY, {containerMode});
}
