// import {injectable} from 'inversify';
import { Iterable } from 'ix';
import { generate, IterableX } from 'ix/iterable';
import { flatMap, map, memoize } from 'ix/iterable/pipe/index';
import { create, all, BigNumber, MathJsStatic } from 'mathjs'
// import ndarray from 'ndarray';

const config = { }
const mathjs: Partial<MathJsStatic> = create(all, config)


import { MappedPoint, ICanvasCalculator, IncrementalPlotterFactory } from '../interface';
import { PointMapping } from './point-mapping.class';
import { CanvasDimensions, RenderScale } from "../if3";

// @injectable()
export class CanvasCalculator implements ICanvasCalculator
{
   /**
    * Find the largest possible divisor of multiplicand that no greater than maxDivisor.
    *
    * @param multiplicand
    * @param maxDivisor
    */
   private static findOptimalDivisor(multiplicand: number, maxDivisor: number)
   {
      if ((multiplicand % maxDivisor) === 0)
      {
         return maxDivisor;
      }

      let ii;
      const sqrt = Math.floor(Math.sqrt(multiplicand));
      if (sqrt > maxDivisor) {
         for (ii = maxDivisor; ii > 1; ii--) {
            if ((multiplicand % ii) === 0) {
               return ii;
            }
         }

         return 1;
      }  {
         let highLowHigh = 0;
         for (ii = sqrt; highLowHigh === 0; ii--) {
            if ((
               multiplicand % ii
            ) === 0)
            {
               highLowHigh = ii;
            }
         }

         let firstFound = true;
         let lowLowHigh = 0;
         for (ii = 2; (ii < highLowHigh) && (lowLowHigh === 0); ii++)
         {
            if ((multiplicand % ii) === 0)
            {
               lowLowHigh = multiplicand / ii;
               if (lowLowHigh > maxDivisor) {
                  lowLowHigh = 0;
                  firstFound = false;
               }
            }
         }

         if ((lowLowHigh > 0) && firstFound)
         {
            return lowLowHigh;
         }

         const altHighLowHigh = multiplicand / highLowHigh;
         if (altHighLowHigh <= maxDivisor) {
            highLowHigh = altHighLowHigh;
         }

         if (lowLowHigh > highLowHigh) {
            highLowHigh = lowLowHigh;
         }

         return highLowHigh;
      }
   }

   private static computeAffinePixelPoints(
       pointCount: number, pixelMulti: number, minValue: number, maxValue: number
   ): Iterable<[number, number]> {
      const halfStep: BigNumber = mathjs.bignumber!((pixelMulti - 1) / 2);
      const step: BigNumber = mathjs.bignumber!(pixelMulti);
      const translate: BigNumber = mathjs.bignumber!(minValue);
      const pRange: BigNumber = mathjs.bignumber!(maxValue - minValue);
      const maxX: BigNumber = mathjs.bignumber!(pointCount);

      // Coordinates in paint space are valued at the center of the painted region a pixel paints.
      // Coordinates in plot space are values at the top-left corner of each painted pixel.
      return generate(
         halfStep,
         (x: BigNumber) => x.lt(maxX),
         (x: BigNumber) => x.add(step),
         (x: BigNumber) => [translate.add(
            pRange.mul(x.div(maxX))
         ).toNumber(), x.sub(halfStep).toNumber()]
      );
   }

   public create(
      maxPointsPerSlice: number, canvasDimensions: CanvasDimensions, renderScale: RenderScale)
      // xCount: number, yCount: number,
      // fitOrFill: 'fit' | 'fill' | 'square',
      // scaleFactor = 1.0, pixelMultiplier = 1
: IncrementalPlotterFactory
   {
      const pixelMulti = renderScale.pixelSize;
      const xCount = canvasDimensions.pixelWidth;
      const yCount = canvasDimensions.pixelHeight;
      const scaleFactor = renderScale.unitScale;
      const fitOrFill = renderScale.fitOrFill;

      if ((pixelMulti % 2) !== 1) {
         throw new Error('Preview pixel multiplier must be odd so the approximations center right');
      }
      if (((xCount % pixelMulti) > 0) || ((yCount % pixelMulti) > 0)) {
         throw new Error('Pixel multiplier must be able evenly divide width and height.');
      }

      let xScale = scaleFactor;
      let yScale = scaleFactor;

      if (xCount === yCount) {
         if (fitOrFill && fitOrFill !== 'square') {
            throw new Error('fitOrFill must be square if width === height');
         }
      } else if (fitOrFill === 'square') {
         throw new Error('fitOrFill cannot be square unless width === height');
      } else if (! fitOrFill) {
         throw new Error('fitOrFill must be set explicitly if width !== height');
      } else if (xCount > yCount) {
         if (fitOrFill === 'fill') {
            xScale *= xCount / yCount;
         } else {
            yScale *= yCount / xCount;
         }
      } else if (fitOrFill === 'fill') {
         yScale *= yCount / xCount;
      } else {
         xScale *= xCount / yCount;
      }
      const widthPoints: IterableX<[number, number]> =
         CanvasCalculator.computeAffinePixelPoints(xCount, pixelMulti, 0.0 - xScale, xScale).pipe(
             memoize(xCount / pixelMulti)
         );
      const heightPoints: IterableX<[number, number]> =
         CanvasCalculator.computeAffinePixelPoints(yCount, pixelMulti, 0.0 - yScale, yScale);
      const pointCount = xCount * yCount / pixelMulti / pixelMulti;
      const mappedPoints =
          heightPoints.pipe(
              flatMap((yPair: [number,number]) =>
                  widthPoints.pipe(
                     map((xPair: [number,number]) => [xPair[1], yPair[1], xPair[0], yPair[0]] as MappedPoint),
                  )
              ),
              // memoize(pointCount)
         );

      const runSize = CanvasCalculator.findOptimalDivisor(pointCount, maxPointsPerSlice);

      /*
      const dataArray = new Float64Array(2 * pointCount);
      const dataView = ndarray(dataArray, [xCount / pixelMulti, yCount / pixelMulti, 2]);
      let pointTuple: MappedPoint;

      let xIndex = 0;
      let xCanvas = 0;
      let xDelta = 0;
      let yCanvas = 0;
      let yDelta = 0;
      const multiDelta = (pixelMulti - 1) / 2;
      for (pointTuple of mappedPoints) {
         if (yDelta == multiDelta) {
            if (xDelta == multiDelta) {
               // The top left corner of every M x M pixel block receives a color taken
               // from the artwork model's center point for that same block.  This is why
               // we need an odd multiplier--so that M - 1 can evenly be split to either
               // side of the sampled color pixel.
               dataView.set(xCanvas, yCanvas, 0, pointTuple[2]);
               dataView.set(xCanvas++, yCanvas, 1, pointTuple[3]);
            } else {
               xDelta++;
            }

            if (++xIndex === xCount) {
               xDelta = xIndex = xCanvas = 0;
               yCanvas++;
               yDelta = 0;
            }
         } else {
            // Note--to skip over unused rows (yDelta increments) we still have to iterate
            // through all X points of the skipped row because they are in the data source.
            if (++xIndex === xCount) {
               xIndex = 0;
               yDelta++;
            }
         }
      }
       */

      return new PointMapping(mappedPoints, pointCount, runSize);
         // { xCount, yCount, pixelMulti, dataArray }, pointCount / runSize, runSize);
   }

   // public create(...args: [number, number, number, ("fit" | "fill" | "square"), number, number]): IncrementalPlotterFactory
   // {
   //    return undefined;
   // }
}
