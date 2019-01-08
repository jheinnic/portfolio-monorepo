import chai from 'chai';

import {
   getGlobalProviderToken, getLocalProviderToken, getModuleIdentifier, getNamedSubtypeIntent,
   getNamedTypeIntent, HasImpliedType, IsImpliedType, TokenDictionary
} from '../../src/di';
import { assert, HasType, IsExactType, NotHasType } from 'conditional-type-checks';
import {
   AnotherSubclass, Class, ISomething, OneSubclass, SomethingOne, SomethingThree, SomethingTwo
} from '../fixtures/primitive';

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
      const MyMod = getModuleIdentifier('My.Mod');
      const ClassId = getNamedTypeIntent<Class>('Class');
      const SomethingId = getNamedTypeIntent<ISomething>('Something');
      const FOO = getLocalProviderToken<Class>(MyMod, ClassId, 'LocalClass');
      const BAR = getGlobalProviderToken<ISomething>(SomethingId, 'GlobalClass');

      interface ITemplate {
         foo: Class;
         bar: ISomething;
      }

      const diDict: TokenDictionary<ITemplate> = {
         foo: FOO,
         bar: BAR,
      };

      assert<IsImpliedType<typeof diDict.foo, Class>>(true);
      assert<IsImpliedType<typeof diDict.bar, ISomething>>(true);

      assert<IsImpliedType<typeof diDict.foo, ISomething>>(false);
      assert<IsImpliedType<typeof diDict.foo, number>>(false);
      assert<IsImpliedType<typeof diDict.bar, Class>>(false);
      assert<IsImpliedType<typeof diDict.bar, number>>(false);

      assert<HasImpliedType<typeof diDict.foo, OneSubclass>>(true);
      assert<HasImpliedType<typeof diDict.foo, AnotherSubclass>>(true);
      assert<HasImpliedType<typeof diDict.bar, SomethingOne>>(true);
      assert<HasImpliedType<typeof diDict.bar, SomethingTwo>>(true);
      assert<HasImpliedType<typeof diDict.bar, SomethingThree>>(true);
   });

   it('Maintains equality when created equivalently', () => {
      const MyMod = getModuleIdentifier('My.Mod');
      const ClassId = getNamedTypeIntent<Class>('Class');
      const SomethingId = getNamedTypeIntent<ISomething>('Something');
      const SomethingOneId = getNamedSubtypeIntent<ISomething, SomethingOne>(SomethingId);
      const SomethingTwoId = getNamedSubtypeIntent<ISomething, SomethingTwo>(SomethingId);

      const FOO_ONE = getLocalProviderToken<Class>(MyMod, ClassId, 'LocalClass');
      const FOO_TWO = getLocalProviderToken<Class>(MyMod, ClassId, 'LocalClass');
      const BAR_ONE = getLocalProviderToken<ISomething>(MyMod, SomethingOneId, 'LocalClass');
      const BAR_TWO = getLocalProviderToken<ISomething>(MyMod, SomethingTwoId, 'LocalClass');
      const BAZ = getLocalProviderToken<Class>(MyMod, ClassId, 'OtherClass');
      const WAR = getLocalProviderToken<SomethingTwo>(MyMod, SomethingTwoId, 'LocalClass');
      const WOR = getLocalProviderToken<SomethingTwo>(MyMod, SomethingTwoId, 'OtherClass');

      // Same name and injection type => Tokens are equal and have the same type.
      expect(FOO_ONE).to.be.equal(FOO_TWO);
      assert<IsExactType<typeof FOO_ONE, typeof FOO_TWO>>(true);

      // Same name but different injection types => Tokens are equal, but also typewise-incompatible.
      expect(FOO_ONE).to.not.be.equal(BAR_ONE);
      assert<NotHasType<typeof FOO_ONE, typeof BAR_ONE>>(true);
      assert<NotHasType<typeof BAR_ONE, typeof FOO_ONE>>(true);

      expect(FOO_ONE).to.not.be.equal(BAR_TWO);
      assert<NotHasType<typeof FOO_ONE, typeof BAR_TWO>>(true);
      assert<NotHasType<typeof BAR_TWO, typeof FOO_ONE>>(true);

      expect(FOO_ONE).to.not.be.equal(WAR);
      assert<NotHasType<typeof FOO_ONE, typeof WAR>>(true);
      assert<NotHasType<typeof WAR, typeof FOO_ONE>>(true);

      expect(BAR_ONE).to.be.equal(BAR_TWO);
      assert<IsExactType<typeof BAR_ONE, typeof BAR_TWO>>(true);

      // Different names but same injection types => Tokens are unequal, but typewise-compatible.
      expect(FOO_ONE).to.not.be.equal(BAZ);
      assert<IsExactType<typeof FOO_ONE, typeof BAZ>>(true);

      expect(BAR_TWO).to.be.equal(WAR);
      assert<HasType<typeof WAR, typeof BAR_TWO>>(true);
      assert<HasType<typeof BAR_TWO, typeof WAR>>(false);

      expect(BAR_TWO).to.not.be.equal(WOR);
      assert<HasType<typeof WOR, typeof BAR_TWO>>(true);
      assert<HasType<typeof BAR_TWO, typeof WOR>>(false);
   });
});
