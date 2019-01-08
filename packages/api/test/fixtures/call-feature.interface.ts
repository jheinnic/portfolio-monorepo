import { IFeature } from './feature.interface';

export const call = Symbol('call');
export const reply = Symbol('reply');

export interface ICallFeature extends IFeature {
   [call]: string[];
   [reply]: string[];
}
