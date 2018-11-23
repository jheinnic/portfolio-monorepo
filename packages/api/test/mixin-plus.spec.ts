import {expect} from 'chai';

import {call, CallFeature, reply} from './fixtures/call-feature.interface';
import {callable} from './fixtures/callable.mixin';
import {counter, CounterFeature} from './fixtures/counter-feature.interface';
import {counting} from './fixtures/counting.mixin';
import {AbstractFeature} from './fixtures/abstract-feature.class';
import {SimpleFeature} from './fixtures';

describe('mixinPlus', () => {
   @callable
   class Callable extends AbstractFeature implements CallFeature {
      [call]: string[];
      [reply]: string[];
   }

   @counting
   class Counter extends AbstractFeature implements CounterFeature {
      [counter]: number;
   }

   @counting
   @callable
   class CallableCounter extends AbstractFeature implements CounterFeature, CallFeature {
      [call]: string[];
      [reply]: string[];
      [counter]: number;
   }



    it('mixes CallFeature fixture', () => {
      const inst: CallFeature = new Callable();

      expect(inst[call]).to.deep.equal(['default', 'call']);
      expect(inst[reply]).to.deep.equal(['default', 'reply']);
    });

   it('mixes CounterFeature fixture', () => {
      const inst: CounterFeature = new Counter();
      expect(inst[counter]).to.equal(2);
   })

   it('mixes CounterFeature dynamically', () => {
      const CountableTwo = counting(SimpleFeature);
      const inst: CounterFeature = new CountableTwo();

      expect(inst[counter]).to.equal(2);
   });

   it('mixes CallFeature dynamically', () => {
      const CallableTwo = callable(SimpleFeature);
      const inst: CallFeature = new CallableTwo();

      expect(inst[call]).to.deep.equal(['default', 'call']);
      expect(inst[reply]).to.deep.equal(['default', 'reply']);
   });

   it('mixes CallFeature dynamically from abstract', () => {
      const CallableThree = callable(AbstractFeature);
      const inst: CallFeature = new CallableThree();

      expect(inst[call]).to.deep.equal(['default', 'call']);
      expect(inst[reply]).to.deep.equal(['default', 'reply']);
   });

   it('mixes CounterFeature dynamically from abstract', () => {
      const CountableThree = counting(AbstractFeature);
      const inst: CounterFeature = new CountableThree();

      expect(inst[counter]).to.equal(2);
   });

   it('mixes CounterFeature and CallFeature dynamically from abstract', () => {
      const CountableFour = counting(AbstractFeature);
      const DualFive = callable(CountableFour);
      const inst: CounterFeature & CallFeature = new DualFive();

      expect(inst[counter]).to.equal(2);
      expect(inst[call]).to.deep.equal(['default', 'call']);
      expect(inst[reply]).to.deep.equal(['default', 'reply']);
   });

   it('mixed dynamic and static features', () => {
      const DualSix = callable(Counter);
      const inst: CallFeature & CounterFeature = new DualSix();

      expect(inst[counter]).to.equal(2);
      expect(inst[call]).to.deep.equal(['default', 'call']);
      expect(inst[reply]).to.deep.equal(['default', 'reply']);
   })

   it('mixes static features', () => {
      const inst = new CallableCounter();

      expect(inst[counter]).to.equal(2);
      expect(inst[call]).to.deep.equal(['default', 'call']);
      expect(inst[reply]).to.deep.equal(['default', 'reply']);
   })
});