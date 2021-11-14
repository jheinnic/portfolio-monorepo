import { IGlobal } from './global';
import { aKey } from './atype';
import { bKey } from './btype';
import { aKey as cKey } from './catype';

export let check1: keyof IGlobal = aKey;
export let check2: keyof IGlobal = bKey;
export let check3: keyof IGlobal = cKey;
