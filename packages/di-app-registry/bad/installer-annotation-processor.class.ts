import {injectable, interfaces} from 'inversify';
import {isKeyOf} from 'simplytyped';
import {MetadataInspector} from '@loopback/metadata';
import {getter} from '@thi.ng/paths';

import {INSTALL_DEPENDENCY_KEY, InstallDependency} from './decorators';

@injectable()
export class InstallerAnnotationProcessor
{
   constructor() { }

   private static readonly noOp: interfaces.ContainerModuleCallBack = function () { };

   scanForImportDecorators(
      inputMessage: any, defaultScope: interfaces.BindingScope
   ): interfaces.ContainerModuleCallBack
   {
      console.log(`Annotation scanner received ${inputMessage}`);
      /*
      const hasClassAnnotation: InstallerRequest =
         MetadataInspector.getClassMetadata(
            INSTALLER_REQUEST_KEY, inputMessage.constructor);

      if (!hasClassAnnotation) {
         return InstallerAnnotationProcessor.noOp;
      }
      */

      const matches = Object.keys(inputMessage)
         .map(
            (propKey: string) => {
               const meta = MetadataInspector.getPropertyMetadata<InstallDependency<any>>(
                  INSTALL_DEPENDENCY_KEY, inputMessage.constructor.prototype, propKey,
                  {ownMetadataOnly: true});

               if ((!meta) || (!isKeyOf(inputMessage, propKey))) {
                  return undefined;
               }

               const value = inputMessage[propKey];
               if (!value) {
                  console.warn(
                     `No value given for ${propKey}, therefore presuming there is already a container binding for ${meta}`);
                  return undefined;
               }

               return { propKey, meta, value };
            }
         )
         .filter(x => !!x);

      return (bind: interfaces.Bind) => {
         for (let nextMatch of matches) {
            // Falsey values are filtered out in the chained method that builds matches,
            // but Typescript cannot figure out that means no undefined values will occur.
            const {propKey, meta, value} = nextMatch!;

            const inWhenOn: interfaces.BindingInWhenOnSyntax<any> =
               bind.bind(meta.serviceIdentifier)
                  .toDynamicValue(value);

            let whenOn: interfaces.BindingWhenOnSyntax<any>;
            switch (meta.bindingScope || defaultScope) {
               case 'Singleton':
               {
                  whenOn = inWhenOn.inSingletonScope();
                  break;
               }
               case 'Transient':
               {
                  whenOn = inWhenOn.inTransientScope();
                  break;
               }
               case 'Request':
               {
                  whenOn = inWhenOn.inRequestScope();
                  break;
               }
               default: {
                  throw new Error(`Unknown scope leaked through: ${meta.bindingScope || defaultScope}`);
               }
            }

            switch (meta.discriminator.type) {
               case 'tagged':
               {
                  whenOn.whenTargetTagged(
                     meta.discriminator.key,
                     meta.discriminator.value
                  );

                  break;
               }
               case 'named':
               {
                  whenOn.whenTargetNamed(
                     meta.discriminator.name);

                  break;
               }
               case 'fromRequest':
               {
                  const getPath = getter(meta.discriminator.path);
                  const director = getPath(inputMessage);
                  if (!!director) {
                     director(whenOn);
                  } else {
                     console.warn(
                        `Could not correctly bind import for ${inputMessage} on ${propKey.toString()} due to ${meta.discriminator.path.toString()} not found`)
                  }

                  break;
               }
               case 'multiBound':
               case 'none':
               {
                  break;
               }
               default: { /* never */
                  throw new Error(`Invalid discriminator: ${meta.discriminator}`);
               }
            }
         }
      }
   }

   scanForExportDecorators(responseMessage: any): interfaces.ContainerModuleCallBack
   {
      console.log(`Annotation scanner received ${responseMessage}`);
      /*
      const hasClassAnnotation: InstallerResponse =
         MetadataInspector.getClassMetadata(
            INSTALLER_RESPONSE_KEY, responseMessage.constructor);

      if (! hasClassAnnotation) {
         return InstallerAnnotationProcessor.noOp;
      }
      */

      return InstallerAnnotationProcessor.noOp;
   }
}