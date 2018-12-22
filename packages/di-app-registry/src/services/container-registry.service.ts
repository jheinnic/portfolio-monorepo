import {Container, interfaces} from 'inversify';

import {IContainerRegistry} from '../interfaces';
import {ConfigLoader} from './config-loader.service';
import {DI_TYPES} from '../di';
import {IDirector} from '@jchptf/api';
import {IComponentContractBuilder} from '../interfaces/component/component-contract-builder.interface';
import {CompositeComponent} from '../interfaces/composite/composite-component.class';
import {InjectDecorators} from '../interfaces/inject-decorators.type';
import getDecorators from 'inversify-inject-decorators';

export class ContainerRegistry implements IContainerRegistry
{
   private static readonly INSTANCE: ContainerRegistry = new ContainerRegistry();

   private readonly installerContainer: Container;

   // private readonly applicationContainer: Container;

   // private currentAppContainer: Container;

   // private readonly parentContainerStack: IStack<Container, DCons<Container>>;

   // TODO: Use an interface--support unit testing!
   // private readonly installerAnnotationProcessor: InstallerAnnotationProcessor;

   // private readonly installerClient: InstallerRegistryClient;

   private readonly internalDecorators: InjectDecorators;

   // private readonly lazyInjection: InjectDecorators;

   private constructor()
   {
      this.installerContainer = new Container({
         autoBindInjectable: false,
         defaultScope: 'Singleton',
         skipBaseClassChecks: true
      });
      /*
      this.applicationContainer = new Container();

      this.lazyInjection = getDecorators(this.applicationContainer);

      this.currentAppContainer = this.applicationContainer;
      this.parentContainerStack = new DCons<Container>();
      */

      // this.applicationContainer.applyMiddleware(
      //    nestedContainerExportMiddleware
      // );

      // this.installerContainer.bind<IContainerRegistryInternal>(DI_TYPES.ContainerRegistryInternal)
      //    .toConstantValue(this);
      // this.installerContainer.bind<InstallerRegistryClient>(DI_TYPES.InstallerRegistryClient)
      //    .to(ContainerRegistryInstallerClient)
      //    .inRequestScope();
      this.internalDecorators = getDecorators(this.installerContainer);
      this.installerContainer.bind(DI_TYPES.ConfigLoader)
         .to(ConfigLoader)
         .inSingletonScope();
   }

   public static getInstance(): IContainerRegistry
   {
      return this.INSTANCE;
   }

   public static getLazyInjectors(): InjectDecorators {
      return this.INSTANCE.getInternalLazyDecorators();
   }

   /*
   public launchApplication<A extends ApplicationLauncher>(
      applicationInstaller: ConstructorFor<A>): void
   {
      const launcher: ApplicationLauncher =
         this.applicationContainer.resolve(applicationInstaller);
      launcher.launch();
   }

   public bindInstaller<M extends InstallerService>(
      installServiceIdentifier: interfaces.ServiceIdentifier<M>,
      serviceConstructor: ConstructorFor<M>): void
   {
      const methodMap: MetadataMap<InstallerMethod> | undefined =
         MetadataInspector.getAllPropertyMetadata(
            INSTALLER_METHOD_KEY, serviceConstructor.prototype );

      this.installerContainer.bind<M>(installServiceIdentifier)
         .to(serviceConstructor)
         .inSingletonScope()
         .onActivation((context: interfaces.Context, injectable: M): M => {
            let methodKey;
            for (methodKey of Object.getOwnPropertyNames(methodMap)) {
               // Every key is expected to be found on injectable--the conditional check
               // is here solely for the sake of providing TypeScript a type guard.
               if (isKeyOf(injectable, methodKey)) {
                  let handler = {
                     apply: function (target: (this: M, ...args: any[]) => any, thisArgument: M, argumentsList: any[]) {
                        console.log(`Starting: ${new Date().getTime()}`);
                        let result = target.apply(thisArgument, argumentsList);
                        console.log(`Finished: ${new Date().getTime()}`);
                        return result;
                     }
                  };
                  injectable[methodKey] = new Proxy<any>(injectable[methodKey], handler);
               }
            }

            return injectable;
         });
   }

   public registerConfig<T extends object>(
      configClass: ClassType<T>, serviceIdentifier: interfaces.ServiceIdentifier<T>): void
   {
      this.installerContainer.bind<T>(serviceIdentifier)
         .toDynamicValue((context: interfaces.Context) => {
            const loader: IConfigLoader = context.container.get(DI_TYPES.ConfigLoader);

            return loader.getConfig(configClass);
         })


   }

   public getLazyInjection(): InjectDecorators
   {
      return this.lazyInjection;
   }
   */

   public getInternalLazyDecorators(): InjectDecorators
   {
      return this.internalDecorators;
   }

   public bindInScope(scopeKey: string | symbol, container: interfaces.Container): void
   {
   }

   public registerComponentByContract(contractDirector: IDirector<IComponentContractBuilder>): void
   {
   }

   public registerCompositeComponent(compositeComponent: CompositeComponent): void
   {
   }
}

/*
public runInstaller<Import, Export>(
   serviceId: InstallerServiceIdentifier<Import, Export>, requestMsg: Import): Export
{
   const installService: InstallerService<Import, Export> =
      this.installerContainer.get(serviceId);

   const importLoader =
      this.installerAnnotationProcessor
         .scanForImportDecorators(requestMsg);

   this.currentAppContainer.load(
      new ContainerModule(importLoader));

   return installService.install(
      this.installerClient, requestMsg);
}

public scanExports<Export>(exportMsg: Export): Export
{
   if (!!exportMsg) {
      const exportLoader =
         this.installerAnnotationProcessor
            .scanForExportDecorators(exportMsg);

      this.currentAppContainer.load(
         new ContainerModule(exportLoader));
   }

   return exportMsg;
}
*/

// public get<T>(injectLabel: interfaces.ServiceIdentifier<T>): T
// {
//    return this.applicationContainer.get(injectLabel);
// }

// public registerInstallers(...installerCallback: [InstallerModuleCallBack]): void
// {
//    this.installerContainer.load(
//       ...installerCallback.map(
//          (callback: InstallerModuleCallBack): ContainerModule =>
//             new ContainerModule((bind: interfaces.Bind) => {
//                const installerModuleBuilder = new InstallerModuleBuilder(bind);
//                callback(installerModuleBuilder);
//             })));
// }

// public registerAsyncInstallers(...installerCallback: [interfaces.AsyncContainerModuleCallBack]):
// Promise<void> { return this.installerContainer.loadAsync( ...installerCallback.map(
// function(callback: interfaces.AsyncContainerModuleCallBack): AsyncContainerModule { return new
// AsyncContainerModule(callback); })); }

/*
public installApplication<A extends ApplicationLauncher>(applicationLoader: ApplicationIdentifier<A>): void
{
   const appInstaller: ApplicationLauncher =
      this.installerContainer.get(applicationLoader);
   if (!appInstaller) {
      throw illegalArgs('Unable to load application callback from installation container');
   }

   if (this.currentAppContainer != this.applicationContainer) {
      throw illegalState('Container stack must be unwound to root before loading an application');
   }

   console.log('Loading App');
   appInstaller.install( this.installerClient );
   console.log('Done Loading');

   // while (this.installerContainer.isBound(DI_TYPES.ContainerModuleCallBack)) {
   //    const nextBatch = this.installerContainer.getAll(DI_TYPES.ContainerModuleCallBack);
   //    this.installerContainer.unbind(DI_TYPES.ContainerModuleCallBack);
   //    nextBatch.forEach(
   //       (callBack: interfaces.ContainerModuleCallBack) => {
   // console.log('Loading a dependency');
   // this.applicationContainer.load(
   //    new ContainerModule(callBack))
   // }
   // );
   // console.log('End of round');
   // }
   // console.log('Done Loading');
}

// public getConfig<T extends object>(configClass: ConstructorFor<T>, rootPath?: string): T {
   // Defer installation until first request to allow all config class imports to have
   // taken place.
   // if (! this.installerContainer.isBound(DI_TYPES.ConfigLoader)) {
   //    this.installerContainer.bind(DI_TYPES.ConfigLoader)
   //       .to(ConfigLoader)
   //       .inSingletonScope();
   // }
   //
   // const configLoader: IConfigLoader = this.installerContainer.get(DI_TYPES.ConfigLoader);
   // return configLoader.getConfig(configClass, rootPath);
// }

public createNestedContainer(containerKey: NestedContainerIdentifier): void
{
   const newChild: interfaces.Container =
      this.currentAppContainer.createChild();
   this.currentAppContainer.bind(containerKey)
      .toConstantValue(newChild);
}

public hasNestedContainer(containerKey: NestedContainerIdentifier): boolean
{
   return this.currentAppContainer.isBound(containerKey);
}

public enterNestedContainer(containerKey: NestedContainerIdentifier): void
{
   const nextContainer = this.currentAppContainer.get(containerKey);

   this.currentAppContainer.bind(DI_TYPES.NestedContainer)
      .toConstantValue(nextContainer)
      .whenTargetTagged(DI_COMMON_TAGS.ContainerId, containerKey);
   this.parentContainerStack.push(this.currentAppContainer);
   this.currentAppContainer = nextContainer;
}

public exitNestedContainer(containerKey: NestedContainerIdentifier): void
{
   if (!this.parentContainerStack.peek())
   {
      if (this.currentAppContainer !== this.applicationContainer) {
         illegalState(`Absurd state encountered--empty stack, but non-root current container!`);
      }
      illegalState(`Cannot complete a nested container with empty container stack!`)
   }

   if (this.currentAppContainer !== this.parentContainerStack.peek()
      .getTagged(
         DI_TYPES.NestedContainer, DI_COMMON_TAGS.ContainerId, containerKey
      ))
   {
      illegalState(
         `Cannot pop container named ${containerKey.toString()} because it is not currently top of stack.`);
   }

   this.currentAppContainer =
      this.parentContainerStack.pop();
   // We created a binding to new container when it was created.

   // TODO: This would be the right place to interact with any
   //       content bridging abstraction.  For any well-known key from the
   //       nested container's module contract, support a toDynamic() binding
   //       that is tagged by the 'DI Common' ContainerId Tag with a value
   //       matching the containerKey used to activate the desired container
   //       instance.
   // NOTE: For the time being, it seems advisable to suggest that
   //       Well-known keys used for exposing nested container contents for
   //       import by their parent container must not have a need to disambiguate
   //       multiple instances from the same container (e.g. by Named or Tagged
   //       bindings.)  If two or more instances of the same type MUST be
   //       exposed by a nested container installer type, then the best fallback
   //       suggestion is to use two distinct ServiceId keys to distinguish one
   //       from the other.
}

public loadModule(result: interfaces.ContainerModuleCallBack): void
{
   this.currentAppContainer.load(
      new ContainerModule(result));
}
*/
