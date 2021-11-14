/// <reference path="../../../../coroutines/typings/medium/index.d.ts"
/// <reference file=".."
import { Canvas } from 'canvas';
import { sleep } from 'medium';
// import { sleep } from "../../../../coroutines/typings/medium"
import { from } from 'rxjs';
import * as fs from 'fs';
import * as crypto from 'crypto';

import '@jchptf/reflection';
import {
    CanvasCalculator, CanvasDimensions,
    ICanvasCalculator,
    IncrementalPlotProgress,
    IncrementalPlotterFactory,
    ModelSeed,
    RandomArtModel,
    RenderScale,
} from '../modules/randomArt';

// const bytes: Buffer[] = []
const terms: Uint8ClampedArray[] = []
// const names: string[] = []
// @ts-ignore
const seqName = crypto.randomBytes(4).base64Slice();
// let ii;
// for (ii = 0; ii < 10; ii++) {
//     bytes[ii] = crypto.randomBytes(9);
//     terms[ii] = new Uint8ClampedArray(bytes[ii]);
//     @ts-ignore
    // names[ii] = bytes[ii].base64Slice();
// }
let ii = 0;
let word;
// const names = ["Thandowasrelhen", "ganwitatinowsai", "Herminstewiting", "tobterprocenthi", "Sinmetandtininc",
//     "plaeprtheresren", "Wilsinainaliver", "ionworblesanwhe", "Ontonsontlarthi", "hemoftosecalnto"];
const names = ["econight", "lectseor", "alarirec", "compinan", "putiecti", "guitears", "nandergo", "lyhevilo", "ineulpro", "thoungin"];
for(word of names) {
    const len = word.length;
    const term = new Uint8ClampedArray(len);
    for (ii=0; ii<len; ii++) {
        term[ii] = word.charCodeAt(ii);
    }
    terms.push(term);
}
fs.writeFileSync(`./ra${seqName}_manifest.dat`, names.join("\n"));


const sequence = dense_wind_g_for_p_to_e(7, 11, 2);

const canvasCalculator: ICanvasCalculator = new CanvasCalculator();

async function main()
{
    console.log('MAIN');
    const width = 480;
    const height = 480;
    const myDimensions: CanvasDimensions = { pixelHeight: height, pixelWidth: width };
    const myRenderScale: RenderScale = { unitScale: 1, pixelSize: 1, fitOrFill: 'square' };
    let idx = 0;
    const termCount = terms.length;
    const pairCount = termCount * termCount;
    for (idx of sequence) {
        idx = idx - 1;
        if (idx < pairCount) {
            const preIdx = idx % termCount;
            const sufIdx = (idx - preIdx) / termCount;
            const modelSeed: ModelSeed = {
                prefixBits: terms[preIdx],
                suffixBits: terms[sufIdx],
                novel: false,
            }
            const myCanvas = new Canvas(width, height);
            const mapPoints: IncrementalPlotterFactory =
                canvasCalculator.create(2000, myDimensions, myRenderScale);
            plotASeed(mapPoints, myCanvas, modelSeed, `ra${seqName}-${names[preIdx]}_${names[sufIdx]}.png`);
            await sleep(580);
        }
    }
    await(sleep(4000));
    process.kill(process.pid, 'SIGTERM');
}

function plotASeed(
    mapPoints: IncrementalPlotterFactory, myCanvas: Canvas, modelSeed: ModelSeed, outputFile: string,
) {
    console.log(outputFile, modelSeed);
    const randomModel: RandomArtModel = new RandomArtModel(modelSeed, myCanvas);
    const points = mapPoints.create(randomModel);

    // const range100 = range(0, 120, asapScheduler); // animationFrameScheduler);
    // zip(range100, from(points))
    // from(points, asapScheduler)
    from(points)
        .subscribe((zipped: IncrementalPlotProgress) => {
            console.log(zipped);
            if (zipped.done === zipped.total) {
                const out = fs.createWriteStream(outputFile);
                const stream = myCanvas.createPNGStream();

                out.on('end', () => {
                    console.log(`Saved png of ${out.bytesWritten} bytes to temp.png`);
                    // resolve(taskContext.canvas);
                });

                stream.on('error', function (err: any) {
                    console.error('Brap!', err);
                    // reject(err);
                    out.close();
                });

                stream.pipe(out);

                console.log('Write');
            }
        });
}

main();
setTimeout(function() {
    console.log('Timer is up');
}, 70000000);
console.log('peace');

function* range(start: number, stop: number) {
    let ii = start;
    while (ii < stop) {
        yield ii
        ii = ii + 1
    }
}

function* wind_g_for_p_to_e(g: number, p: number, e: number) {
    let ii = 0;
    let x = g;
    let p_to_e = Math.pow(p, e);
    let end = (p - 1) * Math.pow(p, e-1);
    for (ii of range(0, end )) {
        yield x
        x = (x * g) % p_to_e
    }
}

function* dense_wind_g_for_p_to_e(g:number, p: number, e: number) {
    const outer = [p];
    const inner = [p - 1];
    let ii = 0;
    for (ii of range(0, e - 1)) {
        outer.push(outer[ii] * p);
        inner.push(inner[ii] * p);
    }
    let x = 0;
    for (x of wind_g_for_p_to_e(g, p, e)) {
        ii = e - 1;
        let adj_x = 0;
        let remainder = 0;
        while (ii >= 0) {
            remainder = (x % outer[ii]);
            adj_x = adj_x + (((x - remainder) / outer[ii]) * inner[ii]);
            x = remainder;
            ii = ii - 1;
        }
        yield (adj_x + remainder)
    }
}
