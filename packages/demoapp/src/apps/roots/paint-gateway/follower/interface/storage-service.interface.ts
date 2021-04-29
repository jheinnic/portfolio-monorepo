import { UUID } from '@jchptf/randomart/dist/infrastructure/validation';
import { IArtworkSeed } from './index';
import { Canvas } from 'canvas';

export interface IStorageService
{
   saveCanvas(uuid: UUID, seed: IArtworkSeed, canvas: Canvas): void;

   // loadCanvas(seed: IArtworkSeed): Canvas
}
