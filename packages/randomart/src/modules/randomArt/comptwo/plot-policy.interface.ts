import {IterableX} from 'ix/iterable';
import {ICanvasDimensions} from "./canvas-dimensions.interface";
import {IDimensionPoint} from "./dimension-point";

export interface IPlotPolicy {
    ulid: string;
    dimensions: ICanvasDimensions;
    xPoints: IterableX<IDimensionPoint>;
    yPoints: IterableX<IDimensionPoint>;
    pixelScale: number;
}