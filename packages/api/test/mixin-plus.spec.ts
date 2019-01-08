import { expect } from 'chai';

import {
   call, callable, ICallFeature, counter, ICounterFeature, counting, reply,
   AbstractFeature, SimpleFeature
} from './fixtures';

describe('mixinPlus', () => {
   @callable
   class Callable extends AbstractFeature implements ICallFeature
   {
      [call]: string[];

      [reply]: string[];
   }

   @counting
   class Counter extends AbstractFeature implements ICounterFeature
   {
      [counter]: number;
   }

   @counting
   @callable
   class CallableCounter extends AbstractFeature implements ICounterFeature, ICallFeature
   {
      [call]: string[];

      [reply]: string[];

      [counter]: number;
   }

   it('mixes CallFeature fixture', () => {
      const inst: ICallFeature = new Callable();
      inst.init();

      expect(inst[call])
         .to
         .deep
         .equal(['default', 'call']);
      expect(inst[reply])
         .to
         .deep
         .equal(['default', 'reply']);
   });

   it('mixes CounterFeature fixture', () => {
      const inst: ICounterFeature = new Counter();
      inst.init();

      expect(inst[counter])
         .to
         .equal(2);
   });

   it('mixes CounterFeature dynamically', () => {
      const CountableTwo = counting(SimpleFeature);
      const inst: ICounterFeature = new CountableTwo();

      expect(inst[counter])
         .to
         .equal(2);
   });

   it('mixes CallFeature dynamically', () => {
      const CallableTwo = callable(SimpleFeature);
      const inst: ICallFeature = new CallableTwo();

      expect(inst[call])
         .to
         .deep
         .equal(['default', 'call']);
      expect(inst[reply])
         .to
         .deep
         .equal(['default', 'reply']);
   });

   it('mixes CallFeature dynamically from abstract', () => {
      const CallableThree = callable(AbstractFeature);
      const inst: ICallFeature = new CallableThree();

      expect(inst[call])
         .to
         .deep
         .equal(['default', 'call']);
      expect(inst[reply])
         .to
         .deep
         .equal(['default', 'reply']);
   });

   it('mixes CounterFeature dynamically from abstract', () => {
      const CountableThree = counting(AbstractFeature);
      const inst: ICounterFeature = new CountableThree();

      expect(inst[counter])
         .to
         .equal(2);
   });

   it('mixes CounterFeature and CallFeature dynamically from abstract', () => {
      const CountableFour = counting(AbstractFeature);
      const DualFive = callable(CountableFour);
      const inst: ICounterFeature & ICallFeature = new DualFive();

      expect(inst[counter])
         .to
         .equal(2);
      expect(inst[call])
         .to
         .deep
         .equal(['default', 'call']);
      expect(inst[reply])
         .to
         .deep
         .equal(['default', 'reply']);
   });

   it('mixed dynamic and static features', () => {
      const DualSix = callable(Counter);
      const inst: ICallFeature & ICounterFeature = new DualSix();

      expect(inst[counter])
         .to
         .equal(2);
      expect(inst[call])
         .to
         .deep
         .equal(['default', 'call']);
      expect(inst[reply])
         .to
         .deep
         .equal(['default', 'reply']);
   });

   it('mixes static features', () => {
      const inst = new CallableCounter();

      expect(inst[counter])
         .to
         .equal(2);
      expect(inst[call])
         .to
         .deep
         .equal(['default', 'call']);
      expect(inst[reply])
         .to
         .deep
         .equal(['default', 'reply']);
   });
});