import {AnyFunc, Keys} from 'simplytyped';

// Conditional on Inheritance
export type IfExtends<T, B> = T extends B ? T : never;
export type IfNotExtends<T, B> = T extends B ? never : T;
export type IfStrictlyExtends<T, B> = Exclude<IfExtends<T, B>, IfNotExtends<T, B>>;


// Structural derivatives
export type Fluently<T> = {
   [K in keyof T]: T[K] extends AnyFunc
      ? (...args: Parameters<T[K]>) => Fluently<T>
      : (arg: T[K]) => Fluently<T>;
};

export type Mutable<T> = {
   -readonly [P in keyof T]: T[P];
};
export type MutablePartial<T> = {
   -readonly [P in keyof T]+?: T[P];
};
export type MutableRequired<T> = {
   -readonly [P in keyof T]-?: T[P];
};
export type ReadonlyPartial<T> = {
   +readonly [P in keyof T]+?: T[P];
};
export type ReadonlyRequired<T> = {
   +readonly [P in keyof T]-?: T[P];
};


// Typeof Type
export type TypeName<T> = T extends string ? 'string' : T extends number ? 'number' : T extends boolean ? 'boolean' : T extends undefined ? 'undefined' : T extends Function ? 'function' : 'object';


// Shape-based Property Classifiers and Filters
export type ValuePropertyNames<T> = {
   [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type ValueProperties<T> = Pick<T, ValuePropertyNames<T>>;

export type FunctionPropertyNames<T> = {
   [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

export interface Getter<T = any> extends Function {
   (): T;
}
export type GetterReturnType<G extends Getter> = ReturnType<G>;

export interface Setter<P extends any[] = any[]> extends Function {
   (...args: P): void;
}
export type SetterParamTypes<S extends Setter> =
   S extends (...args: infer P) => void ? P : never;

export type GetterPropertyNames<T> = {
   [K in FunctionPropertyNames<T>]: T[K] extends Getter ? K : never;
}[FunctionPropertyNames<T>];
export type GetterProperties<T> = Pick<T, GetterPropertyNames<T>>;

export type SetterPropertyNames<T> = {
   [K in FunctionPropertyNames<T>]: T[K] extends Setter ? K : never;
}[FunctionPropertyNames<T>];
export type SetterProperties<T> = Pick<T, SetterPropertyNames<T>>;


export type ReadablePropertyNames<T> =
   GetterPropertyNames<T> | ValuePropertyNames<T>;
export type ReadableProperties<T> =
   Pick<T, ReadablePropertyNames<T>>;
// export type OnlyReadableProperties<T> = {
//    [K in keyof T]: K extends ReadablePropertyNames<T> ? T[K] : never;
// };
export type IfReadable<T> = IfExtends<ReadableProperties<T>, T>;


export type OptionsBagPropertyNames<T> =
   ValuePropertyNames<T> | GetterPropertyNames<T> | SetterPropertyNames<T>;
export type OptionsBag<T> = Pick<T, OptionsBagPropertyNames<T>>;
export type IfOptionsBag<T> = IfExtends<OptionsBag<T>, T>;


export type IfValueType<T> = T extends Function ? never : T;
export type OnlyValueProperties<T> = {
   [K in Keys<T>]: K extends ValuePropertyNames<T> ? T[K] : never
};
export type IsValueProperties<T> = IfExtends<T, OnlyValueProperties<T>>
export type HasNoFunctions<T> = IsValueProperties<T>;


// Inheritance-based Property Classifiers and Filters
export type KeysThatAre<T, C> = {
   [K in Keys<T>]: T[K] extends C ? K : never;
}[Keys<T>];
export type KeysThatAreNot<T, C> = {
   [K in Keys<T>]: T[K] extends C ? never : K;
}[Keys<T>];

// Attempts to exclude wildcard matches on any, which will by definition match
// both KeysThatAre<T, C> and KeysThatAreNot<T, C>, regardless of what C is.
export type StrictKeysThatAre<T, C> =
   Exclude<KeysThatAre<T, C>, KeysThatAreNot<T, C>>;
export type StrictKeysThatAreNot<T, C> =
   Exclude<KeysThatAreNot<T, C>, KeysThatAre<T, C>>;
// export type OnlyStrictKeysThatAre<T, C> = {
//    [K in Keys<T>]: K extends StrictKeysThatAre<T, C> ? T[K] : never;
// }
// export type OnlyStrictKeysThatAreNot<T, C> = {
//    [K in Keys<T>]: K extends StrictKeysThatAreNot<T, C> ? T[K] : never;
// }
export type OnlyStrictKeysThatAre<T, C> =
   Pick<T, StrictKeysThatAre<T, C>>;
export type OnlyStrictKeysThatAreNot<T, C> =
   Pick<T, StrictKeysThatAreNot<T, C>>;
// export type IfStrictKeysThatAre<T, C> =
//    T extends OnlyStrictKeysThatAre<T, C> ? T : never;
// export type IfStrictKeysThatAreNot<T, C> =
//    T extends OnlyStrictKeysThatAreNot<T, C> ? T : never;
export type IfStrictKeysThatAre<T, C> =
   OnlyStrictKeysThatAre<T, C> extends T ? T : never;
export type IfStrictKeysThatAreNot<T, C> =
   OnlyStrictKeysThatAreNot<T, C> extends T ? T : never;

