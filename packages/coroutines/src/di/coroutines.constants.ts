import { getGlobalProviderToken, getNamedTypeIntent } from '@jchptf/nestjs';

import { IConcurrentWorkFactory } from '../interfaces';

const CWF =
   getNamedTypeIntent<IConcurrentWorkFactory>('IConcurrentWorkFactory');

export const CONCURRENT_WORK_FACTORY =
   getGlobalProviderToken<IConcurrentWorkFactory>(CWF);
