import {interfaces} from 'inversify';
import {MetadataAccessor, PropertyDecoratorFactory} from '@loopback/metadata';

import {Discriminator} from './discriminator';

export interface RequiredImport<T>
{
   serviceIdentifier: interfaces.ServiceIdentifier<T>;
   bindingScope?: interfaces.BindingScope;
   discriminator: Discriminator;
}

export const REQUIRED_IMPORT_KEY =
   MetadataAccessor.create<RequiredImport<any>, PropertyDecorator>(
      'required-import-property-key');

/**
 * Decorator for a Fn<Context, T> property that marks its purpose as being
 * for the selection of a dependency provided by the installing party for use
 * by the installed container module.
 */
export function requiredImport<T>(
   serviceIdentifier: interfaces.ServiceIdentifier<T>,
   discriminator: Discriminator,
   bindingScope: interfaces.BindingScope = "Singleton"
): PropertyDecorator
{
   return PropertyDecoratorFactory.createDecorator<RequiredImport<T>>(
      REQUIRED_IMPORT_KEY, {serviceIdentifier, bindingScope, discriminator});
}
