import {Canvas} from 'canvas';
import * as fs from 'fs';
import {new_new_picture, new_picture, compute_pixel} from './genjs5';

import {
    CANVAS_X_COORD,
    CANVAS_Y_COORD,
    IncrementalPlotObserver,
    MappedPoint,
    MODEL_X_COORD,
    MODEL_Y_COORD
} from '../interface';
import {ModelSeed} from '../../../../attic/modules/randomArt/messages2';

export class RandomArtModel implements IncrementalPlotObserver {
    private readonly genModel: any;
    private readonly context: CanvasRenderingContext2D;
    private _closed: boolean = false;

    public constructor(public readonly modelSeed: ModelSeed, private readonly canvas: Canvas) {
        const prefix = [...modelSeed.prefixBits];
        const suffix = [...modelSeed.suffixBits];

        if (modelSeed.novel) {
            // @ts-ignore
            this.genModel = new_new_picture(prefix, suffix);
        } else {
            // @ts-ignore
            this.genModel = new_picture(prefix, suffix);
        }

        this.context = canvas.getContext('2d')!;
        if (this.context === null) {
            throw new Error('Canvas failed to return a 2D context object?');
        }
    }

    public get closed(): boolean {
        console.log('closed');
        return this._closed;
    }

    public complete(): void {
        console.log('complete');
        if (!this._closed) {
            const filePath = 'temp2.png';
            console.log(`Entered stream writer for ${filePath}`);

            const out = fs.createWriteStream(filePath);
            const stream = this.canvas.createPNGStream();

            out.on('end', () => {
                console.log(`Saved png of ${out.bytesWritten} bytes to ${filePath}`);
            });

            stream.on('error', function (err: any) {
                console.error('Brap!', err);
                out.close();
            });

            stream.pipe(out);

            this._closed = true;
        }
    }

    public error(error: any): void {
        console.error(error);
    }

    public next(values: Array<MappedPoint>): void {
        // console.log(value);
        const genModel = this.genModel;
        const context = this.context;
        try {
            values.forEach( (value: MappedPoint) => {
                // @ts-ignore
                context.fillStyle = compute_pixel(genModel, value[MODEL_X_COORD], value[MODEL_Y_COORD]);
                // console.log(`<${canvasX}, ${canvasY}> @ ${context.fillStyle}`)
                context.fillRect(value[CANVAS_X_COORD], value[CANVAS_Y_COORD], 1, 1);
            });
        } catch (err) {
            this.error(err);
        }
    }
}
