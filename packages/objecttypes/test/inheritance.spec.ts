import { IsType } from 'simplytyped'
import chai from 'chai';

import { assert, deny } from '@jchptf/type-testing';
import { ABaseClass, SubClassOne } from '../types/fixtures';
import { IfExtends, IfNotExtends } from '@jchptf/objecttypes';

// chai.use(sinonChai);
const expect = chai.expect;

describe('inheritance.ts', () => {
   beforeEach(() => {
   });

   describe('IfExtends', () => {
      it('Can selectively pass through subclasses', () => {
         assert<IsType<IfExtends<SubClassOne, ABaseClass>, SubClassOne>>(expect)
         deny<IsType<IfNotExtends<SubClassOne, ABaseClass>, never>>(expect);
      });

      it('Can select on conditional match', () => {
         type TestCase = IfExtends<SubClassOne, ABaseClass, number, boolean>;

         assert<IsType<TestCase, number>>(expect);
         deny<IsType<TestCase, boolean>>(expect);
         deny<IsType<TestCase, never>>(expect);
         deny<IsType<TestCase, SubClassOne>>(expect);
      })
   });

   describe('IfNotExtends', () => {
      it('Can selectively filter out subclasses', () => {
         deny<IsType<IfNotExtends<SubClassOne, ABaseClass>, SubClassOne>>(expect);
         assert<IsType<IfNotExtends<SubClassOne, ABaseClass>, never>>(expect);
      });
   });
});
