import {Bool, IsType, True} from 'simplytyped';

export function assert<T extends True>(expect: Chai.ExpectStatic): void {
   const isTrue: T = '1' as T;
   expect(isTrue).to.be.equal('1');
}

export function assertMatch<Test extends Expected, Expected, R1 extends True = IsType<Test, Expected>, R2 extends True = IsType<Expected, Test>>(expect: Chai.ExpectStatic): void {
   type C1 = IsType<Expected, Test>
   // assert<IsType<Test, Expected>>(expect);
   assert<C1>(expect);
}

export interface Assertion<Test> {
   isType<Expected extends Test>(expected?: IsType<Test, Expected>): void;
}

export class TypeAssertion<Test> implements Assertion<Test> {
   constructor(private readonly assertion: Chai.Assertion)

   public isType<Expected extends Test>( expected: IsType<Test, Expected> = '1' ): void
   {
      this.assertion.equals(expected);
   }

}
export function expect<Test>(expect: Chai.ExpectStatic): Assertion<Test> {
   return new TypeAssertion(expect('1'))
}
