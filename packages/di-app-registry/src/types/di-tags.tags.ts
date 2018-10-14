import {IBagOf} from '@jchptf/api';

type CommonTags = 'VariantFor' | 'CuratorOf';

export const DI_COMMON_TAGS: IBagOf<symbol, CommonTags> = {
   VariantFor: Symbol.for('VariantFor'),
   CuratorOf: Symbol.for('CuratorOf')
};
