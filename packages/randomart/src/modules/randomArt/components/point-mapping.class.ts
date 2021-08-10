import { IterableX } from 'ix/iterable';
import { tap, map } from 'ix/iterable/pipe/index';
import { Canvas } from 'canvas';

import {
   IncrementalPlotObserver, IncrementalPlotter, IncrementalPlotterFactory, IncrementalPlotProgress, MappedPoint,
} from '../interface';
import {countChunks} from "../../../infrastructure/lib/count-chunks.class";
// import {stepRange} from "../../../infrastructure/lib";

export class PointMapping implements IncrementalPlotterFactory
{
   private _sliceCount: number;

   public constructor(
      private mappedPoints: IterableX<MappedPoint>, readonly pointCount: number, private readonly sliceSize: number)
   {
       this._sliceCount = pointCount / sliceSize;
      // const { xCount, yCount, pixelMulti, dataArray } = plotGridData;
      // const ndDataArray = ndarray(dataArray, [xCount / pixelMulti, yCount / pixelMulti, 2]);
      // const xPointCount = xCount / pixelMulti;
      // const yPointCount = yCount / pixelMulti;

      // this.mappedPoints = stepRange(0, xPointCount, pixelMulti)
      //    .pipe(
      //       flatMap((xCanvas: [number, number]): Iterable<MappedPoint> =>
      //          stepRange(0, yPointCount, pixelMulti)
      //             .pipe(
      //                map((yCanvas: [number, number]) =>
      //                      [
      //                         xCanvas[0], yCanvas[0],
      //                         ndDataArray.get(xCanvas[1], yCanvas[1], 0),
      //                         ndDataArray.get(xCanvas[1], yCanvas[1], 1),
      //                      ] as MappedPoint),
      //             ),
      //       ),
      //       memoize(xPointCount * yPointCount),
      //    );
       console.log(this._sliceCount, pointCount, sliceSize);
   }

   public create(callback: IncrementalPlotObserver): IncrementalPlotter
   {
      console.log('Calling create IncrementalPlotter');
      let retVal: IncrementalPlotter =
         this.mappedPoints.pipe(
            tap(callback),
            countChunks(this.sliceSize),
            map<number, IncrementalPlotProgress>(
               (_value: number) => (
               {
                  plotter: retVal,
                  done: _value,
                  remaining: this._sliceCount - _value,
                  total: this._sliceCount,
               }
               ),
            ));

      return retVal;
   }

   public isCompatible(_canvas: Canvas): boolean
   {
      return true;
   }
}
