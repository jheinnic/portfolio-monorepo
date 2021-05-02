import { AsyncSink } from 'ix/asyncsink';
import 'ix/add/asynciterable/create';
import 'ix/add/asynciterable/merge';
import 'ix/add/asynciterable-operators/map';
import 'ix/add/asynciterable-operators/share';
import 'ix/add/asynciterable-operators/repeat';
import 'ix/add/asynciterable-operators/flatmap';
import 'ix/add/asynciterable-operators/mergeall';
import 'ix/add/asynciterable-operators/takeuntil';
import 'ix/add/asynciterable-operators/takewhile';
import 'ix/add/iterable-operators/share';
import 'ix/add/iterable/range';
import { CLOSED } from 'medium';
import { Nominal } from 'simplytyped';
declare type CanvasId = Nominal<number, 'CanvasId'>;
declare class CanvasManager {
    private readonly availableSink;
    private readonly canvasId;
    private reserved;
    constructor(availableSink: AsyncSink<CanvasManager>, canvasId: CanvasId);
    reserve(): CanvasId;
    release(): void;
    getReservation(): CanvasId | false;
}
export declare function isClosed(chanVal: CanvasManager | CLOSED): chanVal is CLOSED;
export {};
//# sourceMappingURL=tryIx08.d.ts.map