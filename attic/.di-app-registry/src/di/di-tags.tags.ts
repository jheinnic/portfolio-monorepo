import {IBagOf} from '@jchptf/api';

type CommonTags = 'VariantFor' | 'CuratorOf' | 'ContainerId';

export const DI_COMMON_TAGS: IBagOf<symbol, CommonTags> = {
   VariantFor: Symbol.for('VariantFor'),
   CuratorOf: Symbol.for('CuratorOf'),
   ContainerId: Symbol.for('ContainerId')
};
