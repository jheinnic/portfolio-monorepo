// Shape-based Property Classifiers and Filters
import {BlankObject} from './utility';
import {Getter, IfGetter} from './getter';

export type ValuePropertyNames<T> = {
   [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type ValueProperties<T> =
   ValuePropertyNames<T> extends never ? BlankObject : Pick<T, ValuePropertyNames<T>>;
// export type OnlyValueProperties<T> = {
//    [K in Keys<T>]: K extends ValuePropertyNames<T> ? T[K] : never
// };

export type FunctionPropertyNames<T> = {
   [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
export type FunctionProperties<T> =
   FunctionPropertyNames<T> extends never ? BlankObject : Pick<T, FunctionPropertyNames<T>>;

export type GetterPropertyNames<T> = {
   [K in FunctionPropertyNames<T>]: IfGetter<T[K]> extends Getter ? K : never;
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

export type OptionsBagPropertyNames<T> =
   ValuePropertyNames<T> | GetterPropertyNames<T> | SetterPropertyNames<T>;
export type OptionsBag<T> = Pick<T, OptionsBagPropertyNames<T>>;


