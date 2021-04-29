import { IModelSeed } from './model-seed.interface';
import { Path, UUID } from '@jchptf/randomart/dist/infrastructure/validation';

export interface ArtworkTaskDefinition
{
   readonly taskId: UUID;
   readonly storagePath: Path;
   readonly modelSeed: IModelSeed;
   readonly renderPolicy: UUID;
   readonly storagePolicy: UUID;
   readonly paintEngineVersion: string;
}
