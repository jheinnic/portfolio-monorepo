export interface IBaseClass
{
   type: string;
   readonly count: number;

   getId(): string;

   setId(id: string): void;

   computeIt(a: number, b: number): [number, boolean];
}
