import chai from 'chai';
import { assert, HasType, IsExactType, NotHasType } from 'conditional-type-checks';

import {
   getGlobalProviderToken, getLocalProviderToken, getModuleIdentifier,
} from '@jchptf/nestjs';
import { HasImpliedType, IsImpliedType } from '@jchptf/api';
import {
   AnotherSubclass, Class, ISomething, OneSubclass, SomethingOne, SomethingThree, SomethingTwo,
} from './fixtures';

// chai.use(sinonChai);
const expect = chai.expect;

describe('AssertHelper', () => {
   it('Can pass positive tests', () => {
      assert<true>(true);
   });

   it('Can pass negative tests', () => {
      assert<false>(false);
   });

   /**
    * Negative tests will simply fail to compile--they cannot be asserted at runtime!
    */
   // it('Can fail positive tests', () => {
   //    assert<true>(false);
   // });
   //
   // it('Can fail negative tests', () => {
   //    assert<false>(true);
   // });
});

describe('ProviderTokens', () => {
   beforeEach(() => {
   });

   it('Maintains type information on tokens retrieved from a dictionary', () => {
      const MY_MOD = getModuleIdentifier('MyModule');
      const FOO = getLocalProviderToken<Class>('Class', 'LocalClass');
      const BAR = getGlobalProviderToken<ISomething>(MY_MOD, 'Something', 'GlobalClass');

      // const diDict: TokenDictionary<ITemplate> = {
      //    foo: FOO,
      //    bar: BAR,
      // };

      type fooType = typeof FOO;
      type barType = typeof BAR;

      assert<IsImpliedType<Class, fooType>>(true);
      assert<IsImpliedType<ISomething, barType>>(true);

      assert<IsImpliedType<ISomething, fooType>>(false);
      assert<IsImpliedType<number, fooType>>(false);
      assert<IsImpliedType<Class, barType>>(false);
      assert<IsImpliedType<number, barType>>(false);

      assert<IsImpliedType<OneSubclass, fooType>>(false);
      assert<IsImpliedType<AnotherSubclass, fooType>>(false);
      assert<IsImpliedType<SomethingOne, barType>>(false);
      assert<IsImpliedType<SomethingTwo, barType>>(false);
      assert<IsImpliedType<SomethingThree, barType>>(false);

      assert<HasImpliedType<OneSubclass, fooType>>(true);
      assert<HasImpliedType<AnotherSubclass, fooType>>(true);
      assert<HasImpliedType<SomethingOne, barType>>(true);
      assert<HasImpliedType<SomethingTwo, barType>>(true);
      assert<HasImpliedType<SomethingThree, barType>>(true);
   });

   it('Maintains equality when created equivalently', () => {
      const FOO_ONE = getLocalProviderToken<Class>('Class', 'LocalClass');
      const FOO_TWO = getLocalProviderToken<Class>('Class', 'LocalClass');
      const BAR_ONE = getLocalProviderToken<ISomething>('SomethingOne', 'LocalClass');
      const BAR_TWO = getLocalProviderToken<ISomething>('SomethingTwo', 'LocalClass');
      const BAR_THREE = getLocalProviderToken<ISomething>('Something', 'LocalClass');
      const BAZ = getLocalProviderToken<Class>('Class', 'OtherClass');
      const LOB_ONE = getLocalProviderToken<SomethingOne>('SomethingOne', 'LocalClass');
      const LOB_TWO = getLocalProviderToken<SomethingTwo>('SomethingTwo', 'LocalClass');
      const WOB_TWO = getLocalProviderToken<SomethingTwo>('SomethingTwo', 'OtherClass');

      console.log(FOO_ONE);
      console.log(FOO_TWO);
      console.log(BAR_ONE);
      console.log(BAR_TWO);
      console.log(BAR_THREE);

      // Same name and injection type => Tokens are equal and have the same type.
      expect(FOO_ONE).to.be.equal(FOO_TWO);
      assert<IsExactType<typeof FOO_ONE, typeof FOO_TWO>>(true);

      // Same name but different injection types => Tokens are unequal and type-incompatible.
      expect(FOO_ONE).to.not.be.equal(BAR_ONE);
      assert<NotHasType<typeof FOO_ONE, typeof BAR_ONE>>(true);
      assert<NotHasType<typeof BAR_ONE, typeof FOO_ONE>>(true);

      // Same name but different injection types => Tokens are unequal and type-incompatible.
      expect(FOO_ONE).to.not.be.equal(BAR_TWO);
      assert<NotHasType<typeof FOO_ONE, typeof BAR_TWO>>(true);
      assert<NotHasType<typeof BAR_TWO, typeof FOO_ONE>>(true);

      // Same names and different injection types => Tokens are unequal and type-incompatible.
      expect(FOO_ONE).to.not.be.equal(LOB_TWO);
      assert<NotHasType<typeof FOO_ONE, typeof LOB_TWO>>(true);
      assert<NotHasType<typeof LOB_TWO, typeof FOO_ONE>>(true);

      // Same names and different injections subtypes with a common base type =>
      // Tokens are unequal and have the same type
      expect(BAR_ONE).to.not.be.equal(BAR_TWO);
      assert<IsExactType<typeof BAR_ONE, typeof BAR_TWO>>(true);

      // Different names but same injection types => Tokens are unequal and have same type.
      expect(FOO_ONE).to.not.be.equal(BAZ);
      assert<IsExactType<typeof FOO_ONE, typeof BAZ>>(true);

      expect(BAR_TWO).to.be.equal(LOB_TWO);
      assert<HasType<typeof LOB_TWO, typeof BAR_TWO>>(true);
      assert<HasType<typeof BAR_TWO, typeof LOB_TWO>>(false);

      expect(BAR_TWO).to.not.be.equal(WOB_TWO);
      assert<HasType<typeof WOB_TWO, typeof BAR_TWO>>(true);
      assert<HasType<typeof BAR_TWO, typeof WOB_TWO>>(false);

      expect(LOB_ONE).to.not.be.equal(LOB_TWO);
      assert<HasType<typeof LOB_TWO, typeof LOB_ONE>>(false);
      assert<HasType<typeof LOB_ONE, typeof LOB_TWO>>(false);
   });
});
