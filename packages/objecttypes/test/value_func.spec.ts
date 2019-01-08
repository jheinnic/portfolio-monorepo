import {False, IsType, True} from 'simplytyped'
import chai from 'chai';

import {assert, deny, IsImpliedType} from '@jchptf/type-testing';
import { OnePlaceholder, ManyPlaceholders } from '../types/fixtures';

// chai.use(sinonChai);
const expect = chai.expect;

describe('value_func.ts', () => {
   beforeEach(() => {
   });

   it('Can selectively pass through subclasses', () => {
      assert<IsImpliedType<typeof diDict.bar, SomethingThree>>(expect);
   });
});
