import {MetadataAccessor, PropertyDecoratorFactory} from '@loopback/metadata';
import {interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;
import {IDirector} from '@jchptf/api';
import {ImportDiscriminator} from './discriminators/index';

export interface ImportConstraint<T>
{
   serviceIdentifier: ServiceIdentifier<T>;
   bindingScope?: interfaces.BindingScope
   discriminator: ImportDiscriminator
}

export const IMPORT_CONSTRAINT_KEY =
   MetadataAccessor.create<ImportConstraint<any>, PropertyDecorator>(
      'import-constraint-property-key');

/**
 * Decorator for a Fn<Context, T> property that marks its purpose as being
 * for the selection of a dependency provided by the installing party for use
 * by the installed container module.
 * @param spec
 */
export function importConstraint<T>(spec: ImportConstraint<T>): PropertyDecorator
{
   return PropertyDecoratorFactory.createDecorator<ImportConstraint<T>>(
      IMPORT_CONSTRAINT_KEY, spec);
}
