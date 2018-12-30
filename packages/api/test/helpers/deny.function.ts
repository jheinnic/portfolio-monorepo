import {False} from 'simplytyped';

export function deny<T extends False>(expect: Chai.ExpectStatic): void
{
   const isFalse: T = '0' as T;
   expect(isFalse).to.be.equal('0');
}

