import {interfaces} from 'inversify';

export interface IComponentContractBuilder
{
   // addConfiguration(option: Partial<OCfg>, required: RCfg): InstallComponentBuilder<OCfg, RCfg, C>;
   bindToScope(scopeKey: string|symbol, callback: interfaces.ContainerModuleCallBack): IComponentContractBuilder

   consumeImport <T>(importKey: interfaces.ServiceIdentifier<T>): IComponentContractBuilder;

   provideExport <T>(exportKey: interfaces.ServiceIdentifier<T>): IComponentContractBuilder;

   /**
    * Dependent components will be injected with a ServiceIdentifier that maps multi-bound
    * instances in their own respective containers to the multi-bound ServiceIdentifier
    * represented here.
    *
    * Extension points are related to an onActivation transformation handler that may
    * to things such as:
    * -- Set a holder reference for passing a derive value back to plugin provider
    * -- Achieve a meta-programming task by setting Proxies on the base object
    * -- Extract configuration data from each onHandler input block and use that to
    *    establish the contents of internal.
    *
    * When activating a dependent component, any
    * @param extensionKey The multi-bound key plugins are bound to and transformed from
    *        onActivation.
    * @param extensionPoint The in-place transformation behavior applied to every plugin
    *        supplied to the extension point.
    * @param eager If true, after calling a component's Module CallBack, but before
    *        returning to the Composite handler that include.
    */
   handleExtensionPoint<T>(
      extensionKey: interfaces.ServiceIdentifier<T>,
      extensionPoint: (plugin: T) => T,
      eager?: boolean): IComponentContractBuilder;
}





