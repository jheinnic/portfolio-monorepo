import { InstallerFactory } from './installer-service.interface';
import { IDirector } from '@jchptf/api';
export declare type InstallerAdapter<Builder> = InstallerFactory<[IDirector<Builder>]>;
