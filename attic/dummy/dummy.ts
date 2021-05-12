export const MODULE_ID = Symbol('moduleId');

export interface IModule {
   readonly [MODULE_ID]: symbol;
}

export type ModuleId<T> = T extends IModule ? T[typeof MODULE_ID] : never;

type SymbolKeysOf<T> = {
   [K in keyof T]: K extends symbol ? K : never;
}[keyof T];
// type SymbolTypesOf<T> = {
//    [K in SymbolKeysOf<T>]: T[K];
// }[SymbolKeysOf<T>];

type AltSymbolKeysOf<T> = Exclude<keyof T, string|number>;
type AltSymbolTypesOf<T, K extends AltSymbolKeysOf<T> = AltSymbolKeysOf<T>> = T[K];

export type IToken<M> = M extends IModule ? SymbolKeysOf<M> : never;

const aModule: unique symbol = Symbol('aModule');
const provToken1: unique symbol = Symbol('provToken1');
const provToken2: unique symbol = Symbol('provToken2');

const bModule: unique symbol = Symbol('bModule');
const provToken3: unique symbol = Symbol('provToken3');
const provToken4: unique symbol = Symbol('provToken4');

const provToken5: unique symbol = Symbol('provToken5');

class Thing { }

class AModule {
   readonly [MODULE_ID]: symbol = aModule;
   [provToken1]: Thing;
   [provToken2]: String;
}

class BModule {
   readonly [MODULE_ID]: symbol = bModule;

   [provToken3]: Thing;
   [provToken4]: String;
}

export let aThing: Thing = new Thing();
export let aString: String = 'string';
export let aTest: AltSymbolTypesOf<AModule>;
aTest = aThing;
aTest = aString;
export let aTest2: AltSymbolTypesOf<AModule, typeof provToken1>;
aTest2 = aThing;
aTest2 = aString;
aTest2 = 'abc';

function giveIt<M>(token: IToken<M>) {
   if (token) {
      console.log(`Token is ${token}`);
   } else {
      console.log(`Bad token: ${token}`);
   }
}

giveIt<AModule>(provToken1);
giveIt<AModule>(provToken2);
giveIt<BModule>(provToken3);
giveIt<BModule>(provToken4);

giveIt<BModule>(provToken1);
giveIt<BModule>(provToken2);
giveIt<AModule>(provToken3);
giveIt<AModule>(provToken4);

giveIt<AModule>(provToken5);
giveIt<BModule>(provToken5);
giveIt<IModule<any>>(provToken1);

