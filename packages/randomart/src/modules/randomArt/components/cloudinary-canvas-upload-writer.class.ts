import { Canvas } from 'canvas';

import {IPlotPolicy} from "../comptwo/plot-policy.interface";
import {IModelSeed} from "../comptwo/model-seed.interface";
import {IncrementalPlotObserver} from "../interface";
import {TupleOfLength} from "@jchptf/tupletypes"


class CloudinaryCanvasUploadWriter implements IncrementalPlotObserver {
    constructor(
        private readonly _accountId: String,
        private readonly _accountKey: String,
        private readonly _ulid: String,
        private readonly _canvas: Canvas,
        private readonly _plotPolicy: IPlotPolicy,
        private readonly _modelSeed: IModelSeed
    ) {
        this.closed = false;
    }

    closed: boolean;

    next(_value: TupleOfLength<number, 4>[]): void {

    }

    error(_err: any): void {
        throw new Error(_err);
    }

    complete(): void {
        const long_filename = this._modelSeed.suffixBits + this._modelSeed.prefixBits + this._plotPolicy;
        const ctxt = this._canvas.getContext("2d");
        const client = { saveCanvas: function() {
            ctxt.isPrototypeOf(long_filename)
            return 0.5;
        } };
        client.saveCanvas();
    }

}