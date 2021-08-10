export interface IModelSeed
{
   readonly prefixBits: Uint8ClampedArray;
   readonly suffixBits: Uint8ClampedArray;
   readonly novel: boolean;
}