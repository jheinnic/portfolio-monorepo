import * as fs from 'fs';
import { AsyncIterableX } from 'ix/asynciterable';
import { IterableX } from 'ix/iterable';
import { map, flatMap } from 'ix/iterable/pipe/index';
import { Canvas } from 'canvas';

import { new_new_picture, new_picture, compute_pixel } from '../components';
import {IPlotPolicyClient} from "./plot-policy-client.interface";
import {ICanvasDimensions} from "./canvas-dimensions.interface";
import {IRandomArtPainter} from "./random-art-painter.interface";
import {IPaintingTask} from "./painting-task.interface";
import {IPlotPolicy} from "./plot-policy.interface";
import {IModelSeed} from "./model-seed.interface";
import {IllegalStateError} from "@thi.ng/errors";
import {IDimensionPoint} from "./dimension-point";

export class RandomArtPainter implements IRandomArtPainter {
    private policyClient: IPlotPolicyClient;
    constructor(policyClient: IPlotPolicyClient) {
        this.policyClient = policyClient;
    }
   public begin(renderTask: IPaintingTask, canvas: Canvas): AsyncIterableX<IPaintProgress> {
       const modelSeed: IModelSeed = renderTask.modelSeed;
       const prefix = [...modelSeed.prefixBits];
       const suffix = [...modelSeed.suffixBits];

       let genModel: any;
       if (modelSeed.novel) {
            // @ts-ignore
           genModel = new_new_picture(prefix, suffix);
        } else {
            // @ts-ignore
           genModel = new_picture(prefix, suffix);
        }

       const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
       if (context === null) {
           throw new IllegalStateError('Canvas failed to return a 2D context object?');
       }

       const plotPolicy: IPlotPolicy =
           this.policyClient.lookupPlotPolicy(renderTask.plotPolicyRef);
       const canvasDimensions: ICanvasDimensions = plotPolicy.dimensions;
       const xPoints: IterableX<IDimensionPoint> = plotPolicy.xPoints;
       const yPoints: IterableX<IDimensionPoint> = plotPolicy.yPoints;

       xPoints.pipe(
           flatMap(
               (xPoint: IDimensionPoint) => yPoints.pipe(
                   map(
                       (yPoint: IDimensionPoint) => [xPoint, yPoint]
                   )
               )
           )
       )
   public plot(canvasX: number, canvasY: number, modelX: number, modelY: number): void {
           // @ts-ignore
           this.context.fillStyle = compute_pixel(this.genModel, modelX, modelY);
           // console.log(`<${canvasX}, ${canvasY}> @ ${this.context.fillStyle}`)
           this.context.fillRect(canvasX, canvasY, 1, 1);
       }

   }

   public onComplete(): void {
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
    }

   public onError(error: any): void {
       console.error(error);
    }
}
