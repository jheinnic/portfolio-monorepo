import {makeReducingHandler, mixinPlus} from '../../src';
import {counter, CounterFeature} from './counter-feature.interface';

interface CounterImpl extends CounterFeature {
   init(): void;
}

export const counting = mixinPlus<CounterImpl>({
   behavior: {
      [counter]: 1,
      init(): void {
         this[counter] = 2;
         console.log('This is Countable');
      }
   },
   conflicts: {
      init: makeReducingHandler((_base: void, _mixin: void): void => {})
   }
});