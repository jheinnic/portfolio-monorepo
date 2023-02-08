import { Canvas } from 'canvas';
import { sleep } from 'medium';
import { from } from 'rxjs';
import * as fs from 'fs';
import * as crypto from 'crypto';

import '@jchptf/reflection';
import {PrimePowerRingProviderFactory} from "@jchptf/isaac";
import {
    CanvasCalculator, CanvasDimensions,
    ICanvasCalculator,
    IncrementalPlotProgress,
    IncrementalPlotterFactory,
    ModelSeed,
    RandomArtModel,
    RenderScale,
} from '../modules/randomArt';

const terms: Uint8ClampedArray[] = []
// @ts-ignore
const seqName = crypto.randomBytes(4).base64Slice();
let ii = 0;
let word;
// const names = ["Thandowasrelhen", "ganwitatinowsai", "Herminstewiting", "tobterprocenthi", "Sinmetandtininc",
//     "plaeprtheresren", "Wilsinainaliver", "ionworblesanwhe", "Ontonsontlarthi", "hemoftosecalnto"];
// const names = ["econight", "lectseor", "alarirec", "compinan", "putiecti", "guitears", "nandergo", "lyhevilo", "ineulpro", "thoungin"];
// const names = ["pepsicola", "outdoor", "zippy", "csd-dl-", "rofly"];
const names: Array<string> = ["pepin", "yippo", "rufle"];
for(word of names) {
    const len = word.length;
    const term = new Uint8ClampedArray(len);
    for (ii=0; ii<len; ii++) {
        term[ii] = word.charCodeAt(ii);
    }
    terms.push(term);
}
const contentName = names.join("-");
fs.writeFileSync(
    `${__dirname}/ra${contentName}_manifest.dat`, terms.join("\n"), 'utf8'
);


const jumbleProviderFactory = new PrimePowerRingProviderFactory()
const jumbleProvider = jumbleProviderFactory.initProvider(7, 11, 2);
const sequence = jumbleProvider.jumbledPairsTour(terms, true);

const canvasCalculator: ICanvasCalculator = new CanvasCalculator();

const painterFactory = new CanvasPainterFactory()
const imageUploadFactory = new CloudinaryUploadFactoryFactory();

async function main()
{
    console.log('MAIN');
    const width = 500;
    const height = 50;
    const myDimensions: CanvasDimensions = { pixelHeight: height, pixelWidth: width };
    const myRenderScale: RenderScale = { unitScale: 1, pixelSize: 1, fitOrFill: 'fit' };
    const mapPoints: IncrementalPlotterFactory =
        canvasCalculator.create(2000, myDimensions, myRenderScale);
    let idx: [Uint8ClampedArray, Uint8ClampedArray];
    for (idx of sequence) {
        const preIdx = idx[0]
        const sufIdx = idx[1]
        const modelSeed: ModelSeed = {
            prefixBits: preIdx,
            suffixBits: sufIdx,
            novel: false,
        }
        const myCanvas = new Canvas(width, height);
        await plotASeed(mapPoints, myCanvas, modelSeed, `ra${seqName}-${preIdx}_${sufIdx}.png`);
        // await sleep(580);
        console.log("Next!");
    }
    console.log("Last!");
    await sleep(800);
        // process.kill(process.pid, 'SIGTERM');
    }

function plotASeed(
    mapPoints: IncrementalPlotterFactory, myCanvas: Canvas, modelSeed: ModelSeed, outputFile: string,
): Promise<Canvas> {
    console.log("File with seed: " + outputFile, modelSeed);
    const randomModel: RandomArtModel = new RandomArtModel(modelSeed, myCanvas);
    const points = mapPoints.create(randomModel);
    return new Promise((_resolve, _reject) => {
        // const range100 = range(0, 120, asapScheduler); // animationFrameScheduler);
        // zip(range100, from(points))
        // from(points, asapScheduler)
        const resolve = _resolve;
        const reject = _reject;
        from(points)
            .subscribe((zipped: IncrementalPlotProgress) => {
                console.log(zipped);
                if (zipped.done === zipped.total) {
                    const out = fs.createWriteStream(outputFile);
                    const stream = myCanvas.createPNGStream();

                    out.on('end', () => {
                        console.log(`Saved png of ${out.bytesWritten} bytes to temp.png`);
                        resolve(myCanvas);
                    });

                    stream.on('error', function (err: any) {
                        console.error('Brap!', err);
                    reject(err);
                    out.close();
                });

                stream.pipe(out);

                console.log('Write');
            }
        });
    });
}

main();

setTimeout(function() {
    console.log('Timer is up');
}, 70000000);
console.log('peace');

// function* range(start: number, stop: number) {
//     let ii = start;
//     while (ii < stop) {
//         yield ii
//         ii = ii + 1
//     }
// }
//
// function* wind_g_for_p_to_e(g: number, p: number, e: number) {
//     let ii = 0;
//     let x = g;
//     let p_to_e = Math.pow(p, e);
//     let end = (p - 1) * Math.pow(p, e-1);
//     for (ii of range(0, end )) {
//         yield x
//         x = (x * g) % p_to_e
//     }
// }
//
// function* dense_wind_g_for_p_to_e(g:number, p: number, e: number) {
//     const outer = [p];
//     const inner = [p - 1];
//     let ii = 0;
//     for (ii of range(0, e - 1)) {
//         outer.push(outer[ii] * p);
//         inner.push(inner[ii] * p);
//     }
//     let x = 0;
//     for (x of wind_g_for_p_to_e(g, p, e)) {
//         ii = e - 1;
//         let adj_x = 0;
//         let remainder = 0;
//         while (ii >= 0) {
//             remainder = (x % outer[ii]);
//             adj_x = adj_x + (((x - remainder) / outer[ii]) * inner[ii]);
//             x = remainder;
//             ii = ii - 1;
//         }
//         yield (adj_x + remainder)
//     }
// }
