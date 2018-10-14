import {
   BindingInstallerSyntax, InstallerConstructor, InstallerFactory, InstallerFactoryCreator, InstallerService
} from './interfaces';
import {interfaces} from 'inversify';
import {AnyFunc} from 'simplytyped';
import {DI_TYPES} from './types';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;

export class BindInstallerSyntax<I extends (InstallerFactory | InstallerService)>
   implements BindingInstallerSyntax<I>
{
   constructor(private readonly bindTo: interfaces.BindingToSyntax<any>)
   {
   }

   public to(installer: I & InstallerFactory): void
   {
      this.bindTo.toFunction(installer).onActivation(
         (context: interfaces.Context, value: (I & InstallerFactory)): I => {
            let handler = {
               apply: (
                  target: (I & InstallerFactory), thisArgument: any,
                  argumentsList: Parameters<I & InstallerFactory>) =>
               {
                  // console.log(`Starting: ${new Date().getTime()}`);
                  let result: ContainerModuleCallBack =
                     target.apply(thisArgument, argumentsList);
                  // console.log(`Finished: ${new Date().getTime()}`);
                  context.container.bind(DI_TYPES.ContainerModuleCallBack)
                     .toConstantValue(result);
                  return result;
               }
            };

            return new Proxy(value, handler);
         }
      );
   }

   public toFactory(creator: InstallerFactoryCreator<I & InstallerFactory>): void
   {
      this.bindTo.toFactory(creator);
   }

   public toService(installer: InstallerConstructor<I & InstallerService>): void
   {
      this.bindTo.to(installer)
         .onActivation(
            (context: interfaces.Context, value: (I & InstallerService)): I => {
               let handler = {
                  apply: (
                     target: AnyFunc, thisArgument: I,
                     argumentsList: Parameters<(I & InstallerService)['install']>) =>
                  {
                     // console.log(`Starting: ${new Date().getTime()}`);
                     let result: ContainerModuleCallBack =
                        target.apply(thisArgument, argumentsList);
                     // console.log(`Finished: ${new Date().getTime()}`);
                     context.container.bind(DI_TYPES.ContainerModuleCallBack)
                        .toConstantValue(result);
                     return result;
                  }
               };
               value.install = new Proxy(value.install, handler);

               return value;
            }
         );
   }
}