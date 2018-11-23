import {Feature} from './feature.interface';

export const call = Symbol.for("call");
export const reply = Symbol.for("reply");

export interface CallFeature extends Feature {
   [call]: string[];
   [reply]: string[];
}

