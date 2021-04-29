import { Canvas } from 'canvas';

import { Path } from '@jchptf/randomart/dist/infrastructure/validation';

export interface ICanvasStorageStrategy
{
   saveCanvas(path: Path, canvas: Canvas): Promise<boolean>;

   // TODO!
   // loadCanvas(path: Path): canvas: Promise<Canvas>;
}
// export type ICanvasStorageStrategy =
//    (taskId: UUID, storagePath: Path, canvas: Canvas) => Promise<UUID>
