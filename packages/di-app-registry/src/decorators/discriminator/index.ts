import {NamedDiscriminator} from './named-discriminator.interface';
import {TaggedDiscriminator} from './tagged-discriminator.interface';
import {MultiBoundDiscriminator} from './multi-bound-discriminator.interface';
import {NoDiscriminator} from './no-discriminator.interface';

// export * from './multi-bound-discriminator.interface';
// export * from './named-discriminator.interface';
// export * from './tagged-discriminator.interface';
// export * from './no-discriminator.interface';

export {NamedDiscriminator, TaggedDiscriminator, MultiBoundDiscriminator, NoDiscriminator}
export type Discriminator =
   NamedDiscriminator | TaggedDiscriminator | MultiBoundDiscriminator | NoDiscriminator;