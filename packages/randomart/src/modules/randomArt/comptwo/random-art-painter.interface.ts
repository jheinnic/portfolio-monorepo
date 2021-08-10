import {IPlotProgress} from "./paint-progress.interface";
import {IPaintingTask} from "./painting-task.interface";
import {Canvas} from 'canvas';

export interface IRandomArtPainter {
    begin(renderTask: IPaintingTask, canvas: Canvas): AsyncIterable<IPlotProgress>;
}