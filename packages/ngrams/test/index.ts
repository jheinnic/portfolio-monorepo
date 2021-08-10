import * as chai from 'chai';
import { randomBytes } from 'crypto';
// import sinon, { SinonSandbox, SisunonSpy, SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';

import { BitInputStream } from '@thi.ng/bitstream';

import '@jchptf/reflection';
import {ITx2} from '@jchptf/api';
import {TrigramByteSeedStrategy} from '@jchptf/ngrams';

chai.use(sinonChai);
// const expect: Chai.ChaiStatic = chai.expect;


// describe("ngrams", () => {
//     it("Produces 15 3-trigram terms from 540 bytes", async () => {
async function foo()
{
    const source: Buffer = randomBytes(540);
    const sut: ITx2<BitInputStream, Uint8Array, AsyncGenerator<Uint8Array>> = new TrigramByteSeedStrategy(3);
    let ii = 0;
    let result: Uint8Array;
    for await (result of sut.applyTx(source)) {
        console.log(result);
        ii = ii + 1;
    }
    if (ii !== 15) {
        throw "Fail";
    }
}
    // })
// });


foo();

setTimeout( console.log, 1000000);