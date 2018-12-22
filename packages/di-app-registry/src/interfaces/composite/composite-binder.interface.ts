import {interfaces} from 'inversify';

export interface CompositeBinder
{
   bindImport<T>(
      componentImport: interfaces.ServiceIdentifier<T>,
      importFromKey: interfaces.ServiceIdentifier<T>): CompositeBinder

   addExport<T>(
      componentExport: interfaces.ServiceIdentifier<T>,
      exportToKey: interfaces.ServiceIdentifier<T>): CompositeBinder

   addExtensionPoint<E>(
      componentExtension: interfaces.ServiceIdentifier<E>,
      extendWithKey: interfaces.ServiceIdentifier<E>): CompositeBinder
}





