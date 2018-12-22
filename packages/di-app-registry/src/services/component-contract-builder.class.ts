import {interfaces} from 'inversify';
import {IComponentContractBuilder} from '../interfaces/component/component-contract-builder.interface';

export class ComponentContractBuilder implements IComponentContractBuilder
{
   public bindToScope(
      scopeKey: string | symbol, callback: interfaces.ContainerModuleCallBack): IComponentContractBuilder
   {
      return undefined;
   }

   public consumeImport<T>(importKey: interfaces.ServiceIdentifier<T>): IComponentContractBuilder
   {
      return undefined;
   }

   public handleExtensionPoint<T>(
      extensionKey: interfaces.ServiceIdentifier<T>, extensionPoint: (plugin: T) => T,
      eager?: boolean): IComponentContractBuilder
   {
      return undefined;
   }

   public provideExport<T>(exportKey: interfaces.ServiceIdentifier<T>): IComponentContractBuilder
   {
      return undefined;
   }
}
