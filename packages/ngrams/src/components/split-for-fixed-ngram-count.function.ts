import { BitInputStream } from '@thi.ng/bitstream';
import {AsyncIterableX, from} from "ix/Ix.dom.asynciterable";

export async function * splitForFixedNgramCount(
    seedBits: Buffer | BitInputStream, ngramCount: number = 3
): AsyncGenerator<AsyncIterableX<number>> {
    let bitSource: BitInputStream;
    if (seedBits instanceof Buffer) {
        bitSource = new BitInputStream(seedBits);
    } else {
        bitSource = seedBits;
    }
    while ((bitSource.length - bitSource.position) >= (ngramCount * 32)) {
        yield from(innerSplit(bitSource, ngramCount));
    }
}

async function* innerSplit(seedBits: BitInputStream, ngramCount: number): AsyncGenerator<number> {
    let ii = 0;
    for (ii=0; ii < ngramCount; ii++) {
        yield seedBits.read(32);
    }
}