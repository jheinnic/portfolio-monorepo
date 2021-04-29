import { Canvas } from 'canvas';
import { Path, UUID } from '@jchptf/randomart/dist/infrastructure/validation';
import { IAdapter } from '@jchptf/api';

export interface ICanvasStoragePolicy
{
   store(uuid: UUID, path: Path, canvasAdapter: IAdapter<Canvas>): Promise<UUID>;
}
// export type ICanvasStoragePolicy =
//    (taskId: UUID, storagePath: Path, canvas: Canvas) => Promise<UUID>
