import {IReseedingPseudoRandomSource} from './reseeding-pseudo-random-source.interface';

/**
 * Factory interface that captures the type requirements for the initial
 * seeding of a reseeding pseudo-random source
 */
export interface IReseedingPseudoRandomSourceFactory<S, T = undefined>
{
   seedGenerator(seedSource: S): IReseedingPseudoRandomSource<T>;
}
