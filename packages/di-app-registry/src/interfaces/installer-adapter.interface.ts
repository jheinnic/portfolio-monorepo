import {InstallerFactory} from './installer-factory.interface';
import {IDirector} from '@jchptf/api';

export type InstallerAdapter<Builder> = InstallerFactory<[IDirector<Builder>]>;