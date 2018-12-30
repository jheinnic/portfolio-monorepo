import {False, IsType, True} from 'simplytyped'
import chai from 'chai';

import {
   getGlobalProviderToken, getLocalProviderToken, getModuleIdentifier, getNamedSubtypeIntent,
   getNamedTypeIntent, TokenDictionary
} from '../../src/di';
import {assert, deny, IsImpliedType} from '../helpers';
import {
   AnotherSubclass, Class, ISomething, OneSubclass, SomethingOne, SomethingThree, SomethingTwo
} from '../fixtures/primitive';

// chai.use(sinonChai);
const expect = chai.expect;

describe('AssertHelper', () => {
   it('Can pass positive tests', () => {
      assert<True>(expect);
   });

   it('Can pass negative tests', () => {
      deny<False>(expect);
   });

   /**
    * Negative tests will simply fail to compile--they cannot be asserted at runtime!
   it('Can fail positive tests', () => {
      deny<True>(expect);
   });

   it('Can fail negative tests', () => {
      assert<False>(expect);
   });
    */
});

describe('ProviderTokens', () => {
   beforeEach(() => {
   });

   it('Maintains type information on tokens retrieved from a dictionary', () => {
      const MyMod = getModuleIdentifier('My.Mod')
      const ClassId = getNamedTypeIntent<Class>('Class');
      const SomethingId = getNamedTypeIntent<ISomething>('Something');
      const FOO = getLocalProviderToken<Class>(MyMod, ClassId, 'LocalClass');
      const BAR = getGlobalProviderToken<ISomething>(SomethingId, 'GlobalClass');

      interface Template {
         foo: Class;
         bar: ISomething;
      }

      const diDict: TokenDictionary<Template> = {
         foo: FOO,
         bar: BAR,
      };

      assert<IsImpliedType<typeof diDict.foo, Class>>(expect);
      assert<IsImpliedType<typeof diDict.bar, ISomething>>(expect);

      deny<IsImpliedType<typeof diDict.foo, ISomething>>(expect);
      deny<IsImpliedType<typeof diDict.foo, number>>(expect);
      deny<IsImpliedType<typeof diDict.bar, Class>>(expect);
      deny<IsImpliedType<typeof diDict.bar, number>>(expect);

      assert<IsImpliedType<typeof diDict.foo, OneSubclass>>(expect);
      assert<IsImpliedType<typeof diDict.foo, AnotherSubclass>>(expect);
      assert<IsImpliedType<typeof diDict.bar, SomethingOne>>(expect);
      assert<IsImpliedType<typeof diDict.bar, SomethingTwo>>(expect);
      assert<IsImpliedType<typeof diDict.bar, SomethingThree>>(expect);
   });

   it('Maintains equality when created equivalently', () => {
      const MyMod = getModuleIdentifier('My.Mod')
      const ClassId = getNamedTypeIntent<Class>('Class');
      const SomethingId = getNamedTypeIntent<ISomething>('Something');
      const SomethingOneId = getNamedSubtypeIntent<ISomething, SomethingOne>(SomethingId);
      const SomethingTwoId = getNamedSubtypeIntent<ISomething, SomethingTwo>(SomethingId);

      let FOO_ONE = getLocalProviderToken<Class>(MyMod, ClassId, 'LocalClass');
      let FOO_TWO = getLocalProviderToken<Class>(MyMod, ClassId, 'LocalClass');
      let BAR_ONE = getLocalProviderToken<ISomething>(MyMod, SomethingOneId, 'LocalClass');
      let BAR_TWO = getLocalProviderToken<ISomething>(MyMod, SomethingTwoId, 'LocalClass');
      let BAZ = getLocalProviderToken<Class>(MyMod, ClassId, 'OtherClass');
      let WAR = getLocalProviderToken<SomethingTwo>(MyMod, SomethingTwoId, 'LocalClass');
      let WOR = getLocalProviderToken<SomethingTwo>(MyMod, SomethingTwoId, 'OtherClass');

      // Same name and injection type => Tokens are equal and have the same type.
      expect(FOO_ONE).to.be.equal(FOO_TWO);
      assert<IsType<typeof FOO_ONE, typeof FOO_TWO>>(expect);

      // Same name but different injection types => Tokens are equal, but also typewise-incompatible.
      expect(FOO_ONE).to.not.be.equal(BAR_ONE);
      deny<IsType<typeof FOO_ONE, typeof BAR_ONE>>(expect);

      expect(FOO_ONE).to.not.be.equal(BAR_TWO);
      deny<IsType<typeof FOO_ONE, typeof BAR_TWO>>(expect);

      expect(FOO_ONE).to.not.be.equal(WAR);
      deny<IsType<typeof FOO_ONE, typeof WAR>>(expect);

      expect(BAR_ONE).to.be.equal(BAR_TWO);
      assert<IsType<typeof BAR_ONE, typeof BAR_TWO>>(expect);

      // Different names but same injection types => Tokens are unequal, but typewise-compatible.
      expect(FOO_ONE).to.not.be.equal(BAZ);
      assert<IsType<typeof FOO_ONE, typeof BAZ>>(expect);

      expect(BAR_TWO).to.be.equal(WAR);
      deny<IsType<typeof WAR, typeof BAR_TWO>>(expect);
      assert<IsType<typeof BAR_TWO, typeof WAR>>(expect);

      expect(BAR_TWO).to.not.be.equal(WOR);
      deny<IsType<typeof WOR, typeof BAR_TWO>>(expect);
      assert<IsType<typeof BAR_TWO, typeof WOR>>(expect);
   })
});