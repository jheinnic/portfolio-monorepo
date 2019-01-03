import { NamedDiscriminator } from './named-discriminator.interface';
import { TaggedDiscriminator } from './tagged-discriminator.interface';
import { MultiBoundDiscriminator } from './multi-bound-discriminator.interface';
import { NoDiscriminator } from './no-discriminator.interface';
import { FromRequestDiscriminator } from './from-request-discriminator.interface';
export { NamedDiscriminator, TaggedDiscriminator, MultiBoundDiscriminator, NoDiscriminator };
export declare type Discriminator = NamedDiscriminator | TaggedDiscriminator | MultiBoundDiscriminator | FromRequestDiscriminator | NoDiscriminator;
