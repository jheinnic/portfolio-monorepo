import {Bool, True} from 'simplytyped';

export function assert<T extends True>(expect: Chai.ExpectStatic): <T extends True>( ) => void {
   return ( ) => { expect(true).to.be.true; };
}

