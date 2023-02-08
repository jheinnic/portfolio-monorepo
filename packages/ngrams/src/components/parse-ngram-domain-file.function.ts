import { eachLine } from 'line-reader';

import {NgramListItem} from "../interfaces/ngram-list-item.type";

// import { Chan, chan, put, close, take, CLOSED } from "medium";
import * as fs from "fs";
import {AsyncIterableX} from "ix/Ix.dom.asynciterable";
import {memoize} from "ix/asynciterable/operators";
import {AsyncSink} from "ix/asynciterable";


// export class NgramDomainParser implements INgramDomainParser {
//     async * parseDomainFile (ngramCountFile: string): AsyncGenerator<NgramListItem> {
//         let input = fs.createReadStream(ngramCountFile);
//         const output: Chan<NgramListItem> = chan<NgramListItem>(1);
//         eachLine(input, async (txt: string, last: boolean, cb: Function | undefined) => {
//             try {
//                 console.log('line', txt);
//                 const tokens = txt.split(/ /);
//                 await put(output, {ngram: tokens[0], count: parseInt(tokens[1])});
//                 if (last) {
//                     cb!(true);
//                 }
//             } catch(e) {
//                 cb!(false);
//             } finally {
//                 close(output);
//             }
//         });
//         let next: NgramListItem|typeof CLOSED = await take<NgramListItem>(output);
//         while(next !== CLOSED) {
//             yield (next as NgramListItem);
//             next = await take<NgramListItem>(output);
//         }
//     }
// }


// export class NgramDomainParser implements INgramDomainParser {
export function parseNgramDomainFile (ngramCountFile: string): AsyncIterableX<NgramListItem> {
    let input = fs.createReadStream(ngramCountFile);
    const sinkOut: AsyncSink<NgramListItem> = new AsyncSink<NgramListItem>();
    eachLine(input, (txt: string, last: boolean, cb: Function | undefined) => {
        try {
            console.log('line', txt);
            const tokens = txt.split(/ /);
            sinkOut.write({ngram: tokens[0].toLowerCase(), count: parseInt(tokens[1])});
            if (last) {
                sinkOut.end();
            }
            cb!(true);
        } catch(e) {
            console.error(e);
            sinkOut.error(e);
            sinkOut.end();
            cb!(false);
        }
    });

    async function* doMemo (): AsyncGenerator<NgramListItem> {
        let nextItem;
        for (nextItem; !(nextItem = await sinkOut.next()).done;) {
            yield nextItem.value;
        }
    }


    return memoize<NgramListItem>()(doMemo());
}