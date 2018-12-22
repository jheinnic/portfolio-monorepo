import {interfaces} from 'inversify';
import {IDirector} from '@jchptf/api';
import {Component, IComponentContractBuilder} from './component';
import {CompositeComponent} from './composite';

export interface IContainerRegistry
{
   bindInScope(scopeKey: string | symbol, container: interfaces.Container): void;

   registerCompositeComponent(
      key: interfaces.ServiceIdentifier<Component<any>>,
      compositeComponent: CompositeComponent): void;

   registerComponentByContract(
      key: interfaces.ServiceIdentifier<Component<any>>,
      contractDirector: IDirector<IComponentContractBuilder>): void;
}