const binarySearch = import('binary-search');
import {OperatorAsyncFunction} from "ix/interfaces";
import {AsyncIterableX, reduce, from} from "ix/Ix.dom.asynciterable";
import {map} from "ix/asynciterable/operators";

// import { ZScoreUtil } from 'z-score-util.function';
import {NgramListItem} from "../interfaces/ngram-list-item.type";


function naturalOrder(element: number, needle: number) {
    return element - needle;
}

// @ts-ignore
const MAX_UINT32: number = 4294967295;
// const Z_UTIL = new ZScoreUtil();

type NgramPdfData = {
    readonly ngrams: string[]; // { [K in string]: { weight: number } } ;
    readonly freqSum: number[];
    prefixSum: number;
}

export function seedWordsByPdf(source: AsyncIterable<NgramListItem>): OperatorAsyncFunction<AsyncIterableX<number>, string> {
    const pdfData: Promise<NgramPdfData> = reduce(source, {
        seed: {ngrams: [], freqSum: [], prefixSum: 0},
        callback: async (accum: NgramPdfData, item: NgramListItem, _idx: number): Promise<NgramPdfData> => {
            accum.ngrams.push(item.ngram);
            accum.prefixSum += item.count;
            accum.freqSum.push(accum.prefixSum);
            return accum;
        }
    });

    function do_operator(toModel: AsyncIterable<AsyncIterableX<number>>): AsyncIterableX<string> {
        return from(toModel).pipe(
            map(async (numSequence: AsyncIterableX<number>) => {
                let ngramData = await pdfData;
                return reduce(numSequence, {
                    seed: "",
                    callback: async (agg: string, sourceBits: number): Promise<string> => {
                        const nextP = Math.floor((sourceBits / MAX_UINT32) * ngramData.prefixSum);
                        const bs = (await binarySearch)['default'];
                        let pIdx: number = (await bs(ngramData.freqSum, nextP, naturalOrder));
                        if (pIdx < 0) {
                            pIdx = -1 * (pIdx + 1);
                        }
                        return agg + ngramData.ngrams[pIdx];
                    }
                })
            })
        );
    }

    console.log("Do");
    return do_operator;
}

// TODO: Re-locate and ree-attach NGram-derived IByteSeedStrategy!
// export class NgramByteSeedStrategy implements ITx2<BitInputStream, Uint8Array, AsyncGenerator<Uint8Array>> {
//     private readonly ngrams: Promise<NgramPdfData>;
//     private readonly bytesIn: number;
//     private readonly bytesOut: number;
//
//     constructor(
//         ngramCountFile: string, private ngramLength: number,
//         private wordLengthMean: number = 4, private wordLengthStdev: number = 0) {
//         const ngrams: string[] = [];
//         const freqSum: number[] = [];
//         let prefixSum: number = 0;
//
//         if (wordLengthStdev === 0) {
//             this.bytesIn = 4 * this.wordLengthMean;
//             this.bytesOut = this.ngramLength * this.wordLengthMean;
//         } else {
//             this.bytesIn = this.bytesOut = -1;
//         }
//
//         let kk = 0;
//         for (kk = 0; kk < this.ngramLength; kk++) {
//             output[jj + kk] = nextGram.charCodeAt(kk);
//         }
//         if (jj === 0) {
//             output[jj] = output[jj] - 32;
//         }
//         return processedData;
//         this.ngrams = new Promise<NgramPdfData>((resolve, reject) => {
//             let input = fs.createReadStream(ngramCountFile);
//             eachLine(input, (txt: string, last: boolean, cb: Function | undefined) => {
//                 try {
//                     console.log('line', txt);
//                     const tokens = txt.split(/ /);
//                     ngrams.push(tokens[0].toLowerCase());
//
//                     prefixSum += parseInt(tokens[1]);
//                     freqSum.push(prefixSum);
//
//                     if (last) {
//                         prefixSum = prefixSum * 1.0;
//                         resolve({ngrams, freqSum, prefixSum});
//                     }
//                 } catch (e) {
//                     reject(e);
//                     cb!(false);
//                 }
//                 cb!(true);
//             }, (err) => {
//                 if (err) console.error(err);
//                 throw err;
//             });
//         });
//     }
//
//     // @ts-ignore
//     private static MAX_UINT32: number = 4294967295;
//     private static Z_UTIL = new ZScoreUtil();
//
//     public async * applyTx(selectedBytes: BitInputStream | Uint8Array): AsyncGenerator<Uint8Array>
//     {
//         const ngramData = await this.ngrams;
//         const byteStream: BitInputStream =
//             (selectedBytes instanceof Uint8Array) ? new BitInputStream(selectedBytes) : selectedBytes;
//         let wordLength: number = this.wordLengthMean;
//         if (this.wordLengthStdev > 0) {
//             const lenProb: number = byteStream.read(32) * 1.0 / NGramByteSeedStrategy.MAX_UINT32;
//             const zScore: number = NGramByteSeedStrategy.Z_UTIL.probability_to_zscore(lenProb);
//             wordLength = Math.round(NGramByteSeedStrategy.Z_UTIL.zscore_to_value(
//                 zScore, this.wordLengthMean, this.wordLengthStdev));
//         }
//         // TODO: Handle dynamic bytesIn
//         while ((byteStream.length - byteStream.position) >= this.bytesIn) {
//             const sourceBits = new Uint32Array(byteStream.readWords(wordLength, 32));
//             const output = new Uint8Array(this.bytesOut);
//
//             for (let ii = 0, jj = 0; jj < this.bytesOut; ii++, jj += this.ngramLength) {
//                 // Since sourceBits[ii] is an unsigned int, this should always yield a positive value within [0, prefixSum)
//                 // @ts-ignore
//                 const nextP = Math.floor((sourceBits[ii] / NGramByteSeedStrategy.MAX_UINT32) * ngramData.prefixSum);
//                 const bs = (await binarySearch)['default'];
//                 let pIdx: number = (await bs(ngramData.freqSum, nextP, naturalOrder));
//                 if (pIdx < 0) {
//                     pIdx = -1 * (pIdx + 1);
//                 }
//                 const nextGram = ngramData.ngrams[pIdx];
//                 let kk = 0;
//                 for (kk = 0; kk < this.ngramLength; kk++) {
//                     output[jj + kk] = nextGram.charCodeAt(kk);
//                 }
//                 if (jj === 0) {
//                     output[jj] = output[jj] - 32;
//                 }
//             }
//
//             yield output;
//         }
//     }
// }
