import {IContainerAccessFactory, IContainerAccessStrategy} from '../src/interfaces/index';
import {interfaces} from 'inversify';

export class ContainerAccessFactory implements IContainerAccessFactory {
   public bound<T>(id: interfaces.ServiceIdentifier<T>): IContainerAccessStrategy<T>
   {
      return (context: interfaces.Container) => {
         return context.get(id);
      };
   }

   public boundNamed<T>(id: interfaces.ServiceIdentifier<T>, name: PropertyKey): IContainerAccessStrategy<T>
   {
      return (context: interfaces.Container) => {
         return context.getNamed(id, name);
      };
   }

   public boundTagged<T>(
      id: interfaces.ServiceIdentifier<T>, tag: PropertyKey, value: any): IContainerAccessStrategy<T>
   {
      return (context: interfaces.Container) => {
         return context.getTagged(id, tag, value);
      };
   }

   public multiBound<T>(id: interfaces.ServiceIdentifier<T>): IContainerAccessStrategy<T[]>
   {
      return (context: interfaces.Container) => {
         return context.getAll(id);
      };
   }

}