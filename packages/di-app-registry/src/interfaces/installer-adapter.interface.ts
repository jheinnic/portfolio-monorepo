import {InstallerFactory} from './installer-service.interface';
import {IDirector} from '@jchptf/api';

export type InstallerAdapter<Builder> = InstallerFactory<[IDirector<Builder>]>;