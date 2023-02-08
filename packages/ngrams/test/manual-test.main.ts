import {AsyncIterableX, from} from "ix/asynciterable";
import * as crypto from 'crypto';

import {NgramSeedMapFacade} from "@jchptf/ngrams";
import {splitForFixedNgramCount} from "@jchptf/ngrams";

const byteSource: Buffer = crypto.randomBytes(2048);
const splitIter: AsyncGenerator<AsyncIterableX<number>> = splitForFixedNgramCount(byteSource, 2);
const splitSource: AsyncIterableX<AsyncIterableX<number>> = from<AsyncIterableX<number>>(splitIter);
const facade = new NgramSeedMapFacade();
const wordFeed = facade.quadgramHashRingMap(splitSource);

wordFeed.forEach( (val: string, idx: number): void => {
    console.log(`#${idx + 1}: ${val}`);
}).then((_: any) => {
    console.log('Hooray');
});

setTimeout( () => { }, 1000000 );