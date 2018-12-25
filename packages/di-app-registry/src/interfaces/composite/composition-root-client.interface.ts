import {interfaces} from 'inversify';

import {Component} from '../component/component.interface';
import {IDirector} from '@jchptf/api';
import {CompositeBinder} from './composite-binder.interface';

export interface ICompositionRootClient
{
   bindComponent(
      componentId: interfaces.ServiceIdentifier<Component<any>>,
      director: IDirector<CompositeBinder>): ICompositionRootClient;

   launchApp(
      entryPoint: interfaces.ServiceIdentifier<IApplicationEntryPoint>): ICompositionRootClient;
}