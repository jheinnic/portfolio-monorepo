import {interfaces} from 'inversify';
import {Component} from '../component/component.interface';

export interface CompositeBinder // <OCfg, RCfg, C extends Component<OCfg, RCfg>>
{
   // addConfiguration(option: Partial<OCfg>, required: RCfg): InstallComponentBuilder<OCfg, RCfg, C>;
   registerScope

   bindImport<T>(importKey: interfaces.ServiceIdentifier<T>): CompositeBinder

   addExport <T>(label: string, exportKey: interfaces.ServiceIdentifier<T>): CompositeBinder

   addPlugin<T, P extends any[] = any[]>(
      label: string,
      factoryCreator: interfaces.FactoryCreator<(plugin: P) => T>,
      pluginKey: interfaces.ServiceIdentifier<T>): CompositeBinder

   addExtensionPoint<E>(
      label: string, extPointKey: interfaces.ServiceIdentifier<E>): CompositeBinder
}





