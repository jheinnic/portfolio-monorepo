// import chai from 'chai';
import { assert, HasType, IsExactType, IsNeverType, NotHasType } from 'conditional-type-checks';

import {
   IModule,
   IModuleRegistry,
   ITokenProviding,
   ITokenRequiring,
   IToken,
   ITokenType,
   IRegistryOf
} from '@jchptf/nestjs';
import {
   A_STRING_TOKEN,
   A_SYMBOL_TOKEN,
   B_SUBJECT,
   B_SYMBOL_TOKEN,
   Class,
   ISomething,
   MyModule,
   MyModuleRegistry,
   OneModule,
   OneModuleRegistry
} from './fixtures';

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
      assert<IsExactType<MyModule, MyModule>>(true);
      assert<HasType<Class, IModule<any>>>(false);
      assert<HasType<MyModule, IModule<MyModuleRegistry>>>(true);
      assert<HasType<MyModule, IModule<OneModuleRegistry>>>(false);
      assert<HasType<MyModule, IModuleRegistry>>(false);
      assert<HasType<MyModuleRegistry, IModuleRegistry>>(true);
      assert<NotHasType<Class, IModule<any>>>(true);
   });

   it('Contributes ProviderTokens', () => {
      assert<IsExactType<IRegistryOf<OneModule>, OneModuleRegistry>>(true);
      assert<HasType<IToken<OneModule>, typeof A_STRING_TOKEN>>(true);
      // assert<IsNeverType<
      //   BindableProviderTokens<MyModule, ISomething>
      // >>(true);
      // assert<HasType<
      //   BindableProviderTokens<MyModule, Class>,
      //   typeof A_SYMBOL
      // >>(true);
      // assert<HasType<
      //   BindableProviderTokens<MyModule, Class>, BindableProviderTokens<MyModule>
      // >>(true);
      // assert<HasType<
      //   InjectableProviderTokens<Class, MyModule>,
      //   typeof A_SYMBOL
      // >>(true);
      // assert<HasType<
      //   typeof A_SYMBOL,
      //   InjectableProviderTokens<Class, MyModule>
      // >>(true);
      // assert<HasType<
      //   InjectableProviderTokens<Class, MyModule>,
      //   BindableProviderTokens<MyModule, Class>
      // >>(false);
      // assert<HasType<
      //   BindableProviderTokens<MyModule, Class>,
      //   InjectableProviderTokens<Class, MyModule>
      // >>(true);
   });
});

const foo: ITokenProviding<OneModule, typeof B_SUBJECT> = B_SYMBOL_TOKEN;
const goo: ITokenRequiring<OneModule, typeof B_SUBJECT> = B_SYMBOL_TOKEN;
const hoo: IToken<OneModule> = B_SYMBOL_TOKEN;
console.log(foo);
