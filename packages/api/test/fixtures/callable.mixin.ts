import {makeReducingHandler, mixinPlus} from '../../src';
import {call, reply, CallFeature} from './call-feature.interface';

interface CallImpl extends CallFeature {
   init(): void;
}

export const callable = mixinPlus<CallImpl>({
   behavior: {
      [call]: ["wrong"],
      [reply]: ["wrong"],
      init(): void {
         this[call] = ["default", "call"];
         this[reply] = ["default", "reply"];
         console.log('This is Callable');
      }
   },
   conflicts: {
      init: makeReducingHandler((_base: void, _mixin: void): void => {})
   }
});