// import chai from 'chai';
import { assert, HasType, IsExactType, IsNeverType, NotHasType } from 'conditional-type-checks';

import { BindableProviderTokens, IModule, InjectableProviderTokens, IsIModule } from '@jchptf/nestjs';
import { A_SYMBOL, B_SYMBOL, Class, ISomething, MyModule } from './fixtures';

// chai.use(sinonChai);
// const expect = chai.expect;

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

describe('ModuleTypes', () => {
   beforeEach(() => {
   });

   it('Discriminates module classes by structure without explicit subclassing', () => {
      assert<IsExactType<IsIModule<MyModule>, MyModule>>(true);
      assert<IsExactType<IsIModule<Class>, never>>(true);
      assert<HasType<IsIModule<MyModule>, MyModule>>(true);
      assert<HasType<MyModule, IModule>>(true);
      assert<IsExactType<IsIModule<Class>, never>>(true);
      assert<NotHasType<Class, IModule>>(true);
   });

   it('Contributes ProviderTokens', () => {
      assert<HasType<
        typeof A_SYMBOL,
        BindableProviderTokens<MyModule, Class>
      >>(true);
      assert<IsNeverType<
        BindableProviderTokens<MyModule, ISomething>
      >>(true);
      assert<HasType<
        BindableProviderTokens<MyModule, Class>,
        typeof A_SYMBOL
      >>(true);
      assert<HasType<
        BindableProviderTokens<MyModule, Class>, BindableProviderTokens<MyModule>
      >>(true);
      assert<HasType<
        InjectableProviderTokens<Class, MyModule>,
        typeof A_SYMBOL
      >>(true);
      assert<HasType<
        typeof A_SYMBOL,
        InjectableProviderTokens<Class, MyModule>
      >>(true);
      assert<HasType<
        InjectableProviderTokens<Class, MyModule>,
        BindableProviderTokens<MyModule, Class>
      >>(false);
      assert<HasType<
        BindableProviderTokens<MyModule, Class>,
        InjectableProviderTokens<Class, MyModule>
      >>(true);
   });
});

const foo: BindableProviderTokens<MyModule, ISomething> = typeof B_SYMBOL;
console.log(foo);
