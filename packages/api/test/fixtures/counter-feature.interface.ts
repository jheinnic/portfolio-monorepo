import {Feature} from './feature.interface';

export const counter = Symbol.for("counter");

export interface CounterFeature extends Feature {
   [counter]: number;
}