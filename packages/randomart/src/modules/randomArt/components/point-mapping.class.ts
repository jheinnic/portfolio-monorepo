import {IterableX} from 'ix/iterable';
import {tap, map} from 'ix/iterable/operators';
import {Canvas} from 'canvas';

import {
    IncrementalPlotObserver, IncrementalPlotter, IncrementalPlotterFactory, IncrementalPlotProgress, MappedPoint,
} from '../interface';

export class PointMapping implements IncrementalPlotterFactory {
    private _sliceCount: number;

    public constructor(
        private readonly _mappedPoints: IterableX<MappedPoint[]>, pointCount: number, sliceSize: number
    ) {
        this._sliceCount = pointCount / sliceSize;
    }

    public create(callback: IncrementalPlotObserver): IncrementalPlotter {
        console.log('Calling create IncrementalPlotter');

        return this._mappedPoints.pipe(
            tap(callback),
            map<Array<MappedPoint>, IncrementalPlotProgress>(
                (_value: Array<MappedPoint>, _index: number) => {
                    return {
                        done: _index,
                        remaining: this._sliceCount - _index,
                        total: this._sliceCount
                    };
                }),
        );
    }

    public createChained(callbacks: Array<IncrementalPlotObserver>): IncrementalPlotter {
        console.log('Calling create IncrementalPlotter');

        return this._mappedPoints.pipe(
            ...callbacks.map((callback) => tap(callback))
        ).pipe(
            map<Array<MappedPoint>, IncrementalPlotProgress>(
                (_value: Array<MappedPoint>, _index: number) => {
                    return {
                        done: _index,
                        remaining: this._sliceCount - _index,
                        total: this._sliceCount
                    };
                }
            ),
        );
    }

    public isCompatible(_canvas: Canvas): boolean {
        return true;
    }
}
