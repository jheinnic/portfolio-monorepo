import {interfaces} from 'inversify';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;
import {AnyFunc} from 'simplytyped';

import {IInstallerBindingSyntax, InstallerService} from './interfaces';
import {ContainerRegistryInternal} from './container-registry-internal.interface';

export class InstallerBindingSyntax<I extends InstallerService>
   implements IInstallerBindingSyntax<I>
{
   constructor(
      private readonly internalCb: ContainerRegistryInternal,
      private readonly bindTo: interfaces.BindingToSyntax<any>) { }

   public to( void
   {

                     this.internalCb.scanForRegistryDecorators(argumentsList);
                     // console.log(`Starting: ${new Date().getTime()}`);
                     let result: ContainerModuleCallBack =
                        target.apply(thisArgument, argumentsList);
                     // console.log(`Finished: ${new Date().getTime()}`);
                     this.internalCb.installContainerModule(result);
                     // context.container.bind(DI_TYPES.ContainerModuleCallBack)
                     //    .toConstantValue(result);
                     // context.container.load(
                     //    new ContainerModule(result));

                     return result;
                  }
               };
               value.install = new Proxy(value.install, handler);

               return value;
            }
         );
   }
}