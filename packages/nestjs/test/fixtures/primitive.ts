export class Class { x = 'hey'; }
export class OneSubclass extends Class { y = 'you'; }
export class AnotherSubclass extends Class { x = 'you'; y = 'hey'; }

export const instA = new Class();
export const instB = new Class();
export const instC = new Class();

export const oneInstA = new OneSubclass();
export const oneInstB = new OneSubclass();
export const oneInstC = new OneSubclass();

export const anotherInstA = new AnotherSubclass();
export const anotherInstB = new AnotherSubclass();
export const anotherInstC = new AnotherSubclass();

export interface ISomething {
   doIt(): number;
}

export class SomethingOne implements ISomething {
   doIt(): number { return 1; }

   name(): string { return 'One'; }
}
export class SomethingTwo implements ISomething {
   doIt(): number { return 2; }

   nameTwo(): string { return 'Two'; }
}
export class SomethingThree implements ISomething {
   doIt(): number { return 3; }

   name(): string { return 'Three'; }
}

export type num = 0;
export type str = 'hi';
export type boo = false;
export type obj = object;
export type func = () => string;
export type cls = typeof instA;
export type subCls1 = typeof oneInstA;
export type subCls2 = typeof anotherInstA;

export class AModule
{}