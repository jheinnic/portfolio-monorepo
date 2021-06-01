import {IterableX} from 'ix/iterable';
import {ICanvasDimensions} from "./canvas-dimensions.interface";

export interface IPlotPolicy {
    ulid: string;
    dimensions: ICanvasDimensions;
    pixelScale: number;
    xPoints: IterableX<number>;
    yPoints: number[];
}