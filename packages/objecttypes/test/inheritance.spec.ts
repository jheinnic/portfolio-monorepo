// import chai from 'chai';

import { ABaseClass, SubClassOne } from './fixtures';
import { Extends, Not, IsExactly, IsNever, assert } from '@jchptf/objecttypes';

// chai.use(sinonChai);
// const expect = chai.expect;

describe('inheritance.ts', () => {
   beforeEach(() => {
   });

   describe('IfExtends', () => {
      it('Can selectively pass through subclasses', () => {
         assert<Extends<SubClassOne, ABaseClass>>(true);
         assert<Not<Extends<SubClassOne, ABaseClass>>>(false);
      });

      it('Can select on conditional match', () => {
         type TestCase = Extends<SubClassOne, ABaseClass, number, boolean>;

         assert<IsExactly<TestCase, number>>(true);
         assert<IsExactly<TestCase, boolean>>(false);
         assert<IsNever<TestCase>>(false);
         assert<Not<IsExactly<TestCase, SubClassOne>>>(true);
      });
   });
});
