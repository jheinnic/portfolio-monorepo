import {IReseedingPseudoRandomIterator, IPseudoRandomSource} from '.';

export interface IReseedingPseudoRandomSource<T = undefined> extends IPseudoRandomSource
{
   pseudoRandomIntegers( minValue: number, maxValue: number): IReseedingPseudoRandomIterator<number, T>

   pseudoRandomBuffers( byteCount: number ): IReseedingPseudoRandomIterator<Buffer, T>
}
