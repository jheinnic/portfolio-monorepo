import {ClassDecoratorFactory, MetadataAccessor} from '@loopback/metadata';

export interface InstallerRequest {}

export const INSTALLER_REQUEST_KEY =
   MetadataAccessor.create<InstallerRequest, ClassDecorator>(
      'installer-request-class-key');

/**
 * Decorator for a class used by an Installer class to accept input params that marks it
 * for inspection for @importConstraint property decorators for the ContainerRegistry to
 * provide runtime support for.
 *
 * Has no stateful properties at this moment and just serves as a marker.
 */
export function installerRequest(): ClassDecorator
{
   return ClassDecoratorFactory.createDecorator<InstallerRequest>(INSTALLER_REQUEST_KEY, {});
}

/*
   const retVal = (target: {new(...args: any[]): any }): {new(...args: any[]): any } => {
      return class InstallRequest extends target
      {
         constructor(proto: any)
         {
            super();
            Object.assign(this, proto);
         };
      };
   }
   annotator(retVal);

   return retVal;
}
*/

