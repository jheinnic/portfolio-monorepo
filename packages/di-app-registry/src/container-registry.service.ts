import {Container, ContainerModule, interfaces} from 'inversify';
import ServiceIdentifier = interfaces.ServiceIdentifier;

import {
   ApplicationIdentifier, ApplicationInstaller, IContainerRegistry, InstallerModuleCallBack
} from './interfaces';
import {wrapBindInstaller} from './wrap-bind-installer.function';
import {wrapBindApplication} from './wrap-bind-application.function';

export class ContainerRegistry implements IContainerRegistry
{
   private static readonly INSTANCE: ContainerRegistry = new ContainerRegistry();

   private readonly installerContainer: Container;

   private readonly applicationContainer: Container;

   private constructor()
   {
      this.installerContainer = new Container({
         autoBindInjectable: false,
         defaultScope: 'Singleton',
         skipBaseClassChecks: true
      });
      this.applicationContainer = new Container();
   }

   public static getInstance(): IContainerRegistry
   {
      return this.INSTANCE;
   }

   public get<T>(injectLabel: ServiceIdentifier<T>): T
   {
      return this.applicationContainer.get(injectLabel);
   }

   public registerInstallers(...installerCallback: [InstallerModuleCallBack]): void
   {
      this.installerContainer.load(
         ...installerCallback.map(
            function(callback: InstallerModuleCallBack): ContainerModule {
               return new ContainerModule((bind: interfaces.Bind) => {
                  const bindInstaller = wrapBindInstaller(bind);
                  const bindApplication = wrapBindApplication(bind);
                  callback({bindInstaller, bindApplication});
               });
         }));
   }

   // public registerAsyncInstallers(...installerCallback: [interfaces.AsyncContainerModuleCallBack]): Promise<void>
   // {
   //    return this.installerContainer.loadAsync(
   //       ...installerCallback.map(
   //          function(callback: interfaces.AsyncContainerModuleCallBack): AsyncContainerModule {
   //             return new AsyncContainerModule(callback);
   //          }));
   // }

   public installApplication<A extends ApplicationInstaller>(applicationLoader: ApplicationIdentifier<A>): void
   {
      const appInstaller: ApplicationInstaller = this.installerContainer.get(applicationLoader);
      // const callback: interfaces.ContainerModuleCallBack = this.installerContainer.get(applicationLoader);
      if (! appInstaller) {
         throw new Error('Unable to load application callback from installation container');
      }

      // let appCallBack: interfaces.ContainerModuleCallBack =

      this.applicationContainer.load(
         new ContainerModule(
            appInstaller.install( () => {} )
         ));
   }
}