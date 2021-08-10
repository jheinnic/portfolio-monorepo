import {from} from "ix/asynciterable";
import * as crypto from 'crypto';

import {splitForFixedNgramCount} from "./split-for-fixed-ngram-count.function";
import {NgramSeedMapFacade} from "./ngram-seed-map-facade.service";

const byteSource: Buffer = crypto.randomBytes(2048);
const splitSource = from(splitForFixedNgramCount(byteSource, 2));
const facade = new NgramSeedMapFacade();
const wordFeed = facade.quadgramHashRingMap(splitSource);

wordFeed.forEach( (val: string, idx: number): void => {
    console.log(`#${idx + 1}: ${val}`);
}).then((_: any) => {
    console.log('Hooray');
});

setTimeout( () => { }, 1000000 );