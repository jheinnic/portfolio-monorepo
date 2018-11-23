import {interfaces} from 'inversify';
import {MetadataAccessor, PropertyDecoratorFactory} from '@loopback/metadata';

import {Discriminator} from './discriminator';

export interface InstallDependency<T>
{
   serviceIdentifier: interfaces.ServiceIdentifier<T>;
   bindingScope?: interfaces.BindingScope;
   discriminator: Discriminator;
}

export const INSTALL_DEPENDENCY_KEY =
   MetadataAccessor.create<InstallDependency<any>, PropertyDecorator>(
      'install-dependency-property-key');

/**
 * Decorator for a Fn<Context, T> property that marks its purpose as being
 * for the selection of a dependency provided by the installing party for use
 * by the installed container module.
 */
export function installDependency<T>(
   serviceIdentifier: interfaces.ServiceIdentifier<T>,
   discriminator: Discriminator,
   bindingScope: interfaces.BindingScope = "Singleton"
): PropertyDecorator
{
   return PropertyDecoratorFactory.createDecorator<InstallDependency<T>>(
      INSTALL_DEPENDENCY_KEY, {serviceIdentifier, bindingScope, discriminator});
}
