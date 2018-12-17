import {interfaces} from 'inversify';
import {ConstructorFor} from 'simplytyped';

import {IApplicationEntryPoint} from './application-entry-point.interface';
import {Component} from './component.interface';
import {InstallComponentBuilder} from './install-component-builder.interface';
import {IDirector} from '@jchptf/api';

export interface ICompositionRootClient
{
   registerComponent<O, R, S>(
      componentId: interfaces.ServiceIdentifier<Component<O, R, S>>,
      componentCons: ConstructorFor<Component<O, R, S>>): ICompositionRootClient;

   loadComponent<O, R, S>(
      componentId: interfaces.ServiceIdentifier<Component<O, R, S>>,
      director: IDirector<InstallComponentBuilder<O, R, S>>): ICompositionRootClient;

   launchApp(
      entryPoint: interfaces.ServiceIdentifier<IApplicationEntryPoint>): ICompositionRootClient;
}