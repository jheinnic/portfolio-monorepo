export class Foo {
   initialized = false;
   private name = "nobody";
   age: number;

   constructor(readonly foo: number) {
      this.age = foo;
   }

   init(): void {
      this.initialized = true;
      this.log();
      this.name = "everybody";
   }

   private log(): void {
      console.log("Initialized", this.name);
   }
}

export type Some = "a" | "b" | "c";
export type More = "a" | "b" | "c" | "d" | "e";
export type Others = "b" | "d";
export type Awesome = "a" | "b" | "d";
export type Super = "b" | "d" | "e";
export type FinalFour = "b" | "c" | "d" | "e";

export interface IOne {
   a: string;
   b: string | boolean;
   c: Others;
   d: any;
   e: boolean;
   f: never;
   g: undefined;
   h?: string;
   i?: string | boolean;
   j?: Others;
   k?: any;
   l?: boolean;
}