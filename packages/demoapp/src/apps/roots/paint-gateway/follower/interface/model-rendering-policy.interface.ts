import { Canvas } from 'canvas';

import { IncrementalPlotter, IRandomArtModel } from './index';
import { IAdapter } from '@jchptf/api';

export interface IModelRenderingPolicy {
   create(genModel: IRandomArtModel, canvasAdapter: IAdapter<Canvas>, canvasResizeOk?: boolean): IncrementalPlotter;
}
// export type IModelRenderingPolicy =
//    (genModel: IRandomArtModel, canvas: Canvas, canvasResizeOk?: boolean) => IncrementalPlotter;
