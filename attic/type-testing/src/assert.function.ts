import {True} from 'simplytyped';

export function assert<T extends True>(expect: Chai.ExpectStatic): void {
   const isTrue: T = '1' as T;
   expect(isTrue).to.be.equal('1');
}

