"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("@loopback/metadata");
exports.INSTALLER_REQUEST_KEY = metadata_1.MetadataAccessor.create('installer-request-class-key');
/**
 * Decorator for a class used by an Installer class to accept input params that marks it
 * for inspection for @importConstraint property decorators for the ContainerRegistry to
 * provide runtime support for.
 *
 * Has no stateful properties at this moment and just serves as a marker.
 */
function installerRequest() {
    return metadata_1.ClassDecoratorFactory.createDecorator(exports.INSTALLER_REQUEST_KEY, {});
}
exports.installerRequest = installerRequest;
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
