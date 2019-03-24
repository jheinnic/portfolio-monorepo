import {
   makeFunctionReducingConflictHandler, makeReplacingConflictHandler, MixinContent, mixinPlus
} from '@jchptf/mixins';
import { call, ICallFeature, reply } from './call-feature.interface';
import { Omit } from 'simplytyped';
import { counter } from './counter-feature.interface';

class CallImpl implements ICallFeature
{
   [call] = ['wrong1a'];

   [reply] = ['wrong1b'];

   init(): void {
      this[call] = ['default', 'call'];
      this[reply] = ['default', 'reply'];
      console.log('This is Callable');
   }
}

type InstanceCall = CallImpl;
type StaticCall = Omit<typeof CallImpl, 'prototype'>;

const basicInst = new CallImpl();
const protoInst = { ...basicInst, ...basicInst.constructor.prototype };
protoInst.init = basicInst.constructor.prototype.init;

const mixinContent: MixinContent<InstanceCall, StaticCall> =
   new MixinContent<InstanceCall, StaticCall>(
      {
         implementation: protoInst,
         valueConflicts: {
            [counter]: makeReplacingConflictHandler(),
         },
         functionConflicts: {
            init: makeFunctionReducingConflictHandler(
               (_base: undefined, _mixin: undefined): void => {}),
            getCount: makeReplacingConflictHandler(),
         },
      },
      {
         implementation: {},
         valueConflicts: {},
         functionConflicts: {},
      },
   );

export const callable = function () {
   return mixinPlus<InstanceCall, StaticCall>(mixinContent);
};

//    behavior: {
//       [call]: ['wrong'],
//       [reply]: ['wrong'],
//       init(): void
//       {
//          this[call] = ['default', 'call'];
//          this[reply] = ['default', 'reply'];
//          console.log('This is Callable');
//       }
//    },
//    conflicts: {
//       init: makeFunctionReducingConflictHandler((_base: void, _mixin: void): void => {})
//    }
// });
