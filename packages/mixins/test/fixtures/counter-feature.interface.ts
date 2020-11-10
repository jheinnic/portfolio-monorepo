import { IFeature } from './feature.interface';

export const counter = Symbol('counter');

export interface ICounterFeature extends IFeature {
   // [counter]: number;
   getCount(): number;
}
