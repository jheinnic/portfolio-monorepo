import { Canvas } from 'canvas';

import {IPlotPolicy} from "../comptwo/plot-policy.interface";
import {IModelSeed} from "../comptwo/model-seed.interface";
import {IPlotterMiddleware} from "./plotter-middleware";
import {IncrementalPlotObserver} from "../interface";

class CloudinaryCanvasUploadWriter implements IPlotterMiddleware {
    constructor(private readonly _accountId: String, private readonly _accountKey: String) {

    }

    getObserver(canvas: Canvas, ulid: String, plotPolicy: IPlotPolicy, modelSeed: IModelSeed): IncrementalPlotObserver {
        return new CloudinaryCanvasUploadWriter(this._accountId, this._accountKey, ulid, canvas, plotPolicy, modelSeed);
    }
}