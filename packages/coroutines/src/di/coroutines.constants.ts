import {getGlobalProviderToken, getNamedTypeIntent} from '@jchptf/api';
import {IConcurrentWorkFactory} from '../interfaces';

const CWF = getNamedTypeIntent<IConcurrentWorkFactory>('IConcurrentWorkFactory');

export const CONCURRENT_WORK_FACTORY = getGlobalProviderToken<IConcurrentWorkFactory>(CWF);

// interface CoroutineRoleNames {
//    concurrentWorkFactory: IConcurrentWorkFactory;
// }
// export const CO_TYPES: TokenDictionary<CoroutineRoleNames> = {
//    concurrentWorkFactory: CONCURRENT_WORK_FACTORY
// };
