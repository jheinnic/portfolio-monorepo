import { Canvas } from 'canvas';

import { UUID } from '@jchptf/randomart/dist/infrastructure/validation';
import { IArtworkSeed, IncrementalPlotter } from './index';

export interface IRenderingService
{
   // registerSeed( modelSeed: IArtworkSeed ): IRandomArtworkMemento
   //
   // renderArtwork(
   //    policyId: UUID, genModel: IRandomArtworkMemento, canvas: Canvas, resizeCanvasOk?: boolean
   // ): IncrementalPlotter
   //
   // unregisterSeed( memento: IRandomArtworkMemento

   renderArtwork(
      policyId: UUID, modelSeed: IArtworkSeed, canvas: Canvas, resizeCanvasOk?: boolean,
   ): IncrementalPlotter;
}
