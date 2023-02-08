import {zip} from "ix/asynciterable";
import {map} from "ix/asynciterable/operators";
import {AsyncSink} from "ix";
import {Canvas} from "canvas";
import {IPaintingTask} from "./painting-task.interface";
import {IRandomArtPainter} from "./random-art-painter.interface";


export class EngineClass {
    private canvasSink: AsyncSink<Canvas>;
    private inputTasks: AsyncSink<IPaintingTask>;
    private randomArtPainter: IRandomArtPainter;

    constructor(canvasSink: AsyncSink<Canvas> , inputTasks: AsyncSink<IPaintingTask> , randomArtPainter: IRandomArtPainter  ) {
        this.canvasSink = canvasSink;
        this.inputTasks = inputTasks;
        this.randomArtPainter = randomArtPainter;
    }

    init(): void {
        zip<Canvas, IPaintingTask>(this.canvasSink, this.inputTasks).pipe(
            map( (pair: [Canvas, IPaintingTask]) => this.randomArtPainter.begin(pair[1], pair[0]) )
        );
    }
}