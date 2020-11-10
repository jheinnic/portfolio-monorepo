// import { IGlobalModule } from '@jchptf/nestjs';
// import './global';
import { IGlobalModule } from '@jchptf/nestjs';
import { IConfigReader } from '../interfaces';
import { CONFIG_READER } from './config.constants';

type AA<key extends keyof IGlobalModule> = IGlobalModule[key];

export let aa: AA<typeof CONFIG_READER>;
export let bb: IConfigReader;
bb = aa;
aa = bb;
