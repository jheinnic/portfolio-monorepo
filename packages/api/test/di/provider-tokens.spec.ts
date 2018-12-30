import {False, True} from 'simplytyped'
import chai from 'chai';

import {getProviderToken, TokenDictionary} from '../../src/di';
import {assert, deny, IsImpliedType} from '../helpers';
import {Class} from '../fixtures/primitive';

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
      const FOO = getProviderToken<Class, 'foo'>('foo');

      interface Template {
         foo: Class
      }

      const diDict: TokenDictionary<Template> = {
         foo: FOO
      };

      assert<IsImpliedType<typeof diDict.foo, Class>>(expect);
   });
});