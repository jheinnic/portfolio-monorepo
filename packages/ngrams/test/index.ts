import * as chai from 'chai';
import { randomBytes } from 'crypto';
// import sinon, { SinonSandbox, SinonSpy, SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';

// import { BitInputStream } from '@thi.ng/bitstream';

import '@jchptf/reflection';
import {splitForFixedNgramCount} from '@jchptf/ngrams';
import {AsyncIterableX} from "ix/asynciterable";

chai.use(sinonChai);
// const expect: Chai.ChaiStatic = chai.expect;


// describe("ngrams", () => {
//     it("Produces 15 3-trigram terms from 540 bytes", async () => {
async function foo()
{
    const source: Buffer = randomBytes(540);
    const sut: AsyncGenerator<AsyncIterableX<number>> = splitForFixedNgramCount(source, 3);
    let ii = 0;
    let result: AsyncIterableX<number>;
    for await (result of sut) {
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