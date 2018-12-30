import {False} from 'simplytyped';

export function deny<T extends False>(expect: Chai.ExpectStatic): <T extends False>( ) => void {
   return ( ) => { expect(false).to.be.false };
}

