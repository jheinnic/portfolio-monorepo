import { makeFunctionReducingConflictHandler, MixinContent, mixinPlus } from '@jchptf/mixins';
import { counter, ICounterFeature } from './counter-feature.interface';
import { Omit } from 'simplytyped';

class CounterImpl implements ICounterFeature
{
   [counter] = 1;

   init(): void
   {
      console.log(`On becoming countable: ${this} and ${this[counter]}`);
      this[counter] = 2;
      console.log(`This is Countable: ${this} and ${this[counter]}`);
   }

   getCount(): number
   {
      console.log(`Returning ${this[counter]} for ${this}`);
      return this[counter];
   }
}

type InstanceCall = CounterImpl;
type StaticCall = Omit<typeof CounterImpl, 'prototype'>;

const basicInst = new CounterImpl();
const protoInst: any = { ...basicInst };
protoInst.init = basicInst.constructor.prototype.init;

console.log('inst', protoInst);

const mixinContent: MixinContent<InstanceCall, StaticCall> =
   new MixinContent<InstanceCall, StaticCall>(
      {
         implementation: protoInst,
         valueConflicts: {},
         functionConflicts: {
            init: makeFunctionReducingConflictHandler(
               (_base: undefined, _mixin: undefined): void => {
                  console.log('Hiya');
               }),
         },
      },
      {
         implementation: {},
         valueConflicts: {},
         functionConflicts: {},
      },
   );

export const counting = function () {
   return mixinPlus<InstanceCall, StaticCall>(mixinContent);
};

// {
//    behavior: {
//       [counter]: 1,
//       init(): void {
//          this[counter] = 2;
//          console.log('This is Countable');
//       }
//    },
//    conflicts: {
//       init: makeReducingHandler((_base: void, _mixin: void): void => {})
//    }
// });