import { Canvas } from 'canvas';

import {IPlotPolicy} from "../comptwo/plot-policy.interface";
import {IModelSeed} from "../comptwo/model-seed.interface";
import {IncrementalPlotObserver} from "../interface";
import {UnknownKeyError} from "../interface/unknown-key-error.class";
import {NullObjectError} from "../interface/null-object-error.class";
import {NullKeyError} from "../interface/null-key-error.class";

interface IPlotterMiddleware {
    getObserver(request: PlotRequest): IncrementalPlotObserver
}



class PlotRequest {
    private _session: Map<String, any>;

    constructor(readonly canvas: Canvas, readonly plotPolicy: IPlotPolicy, readonly modelSeed: IModelSeed ) {
        this._session = new Map();
    }

    public lookup<E>(key: String): E {
        let retval: any = this._session.get(key);
        if (! retval) {
            throw new UnknownKeyError(key);
        }
        return retval as E;
    }

    public store<E>(key: String, object: E): void {
        if (!key) {
            throw new NullKeyError();
        }
        if (!object) {
            throw new NullObjectError();
        }
        this._session.set(key, object);
    }
}