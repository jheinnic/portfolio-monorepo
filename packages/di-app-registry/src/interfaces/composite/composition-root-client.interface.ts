import {interfaces} from 'inversify';
import {ConstructorFor} from 'simplytyped';

import {Component} from '../component/component.interface';
import {IDirector} from '@jchptf/api';

export interface ICompositionRootClient
{
   bindComponent(
      componentId: interfaces.ServiceIdentifier<Component<any>>,
      director: IDirector<CompositeBinder>): ICompositionRootClient;

   launchApp(
      entryPoint: interfaces.ServiceIdentifier<IApplicationEntryPoint>): ICompositionRootClient;
}