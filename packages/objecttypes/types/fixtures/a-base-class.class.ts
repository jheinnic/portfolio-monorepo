import { IBaseClass } from './base-class.interface';

export class ABaseClass implements IBaseClass {
   private _count = 0;

   private myType = "myType";

   get count(): number {
      return this._count;
   }

   get type(): string {
      return this.myType;
   }

   set type(value: string) {
      this.myType = value;
   }

   computeIt(a: number, b: number): [number, boolean]
   {
      const sum = a + b;
      this._count += sum;
      return [sum, (this.count % 2) === 1];
   }

   getId(): string
   {
      return this.type;
   }

   setId(id: string): void
   {
      this.type = id;
   }
}
