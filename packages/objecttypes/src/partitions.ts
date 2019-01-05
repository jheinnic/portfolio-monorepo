// Shape-based Property Classifiers and Filters
import {BlankObject} from './utility';
import {IfGetter} from './getter';
import {IfSetter} from './setter';
import {IfFunctionType, IfValueType} from './value_func';

export type ValuePropertyNames<T> = {
   [K in keyof T]: IfValueType<T[K], K>;
}[keyof T];
export type ValueProperties<T> =
   ValuePropertyNames<T> extends never ? BlankObject : Pick<T, ValuePropertyNames<T>>;
// export type OnlyValueProperties<T> = {
//    [K in Keys<T>]: K extends ValuePropertyNames<T> ? T[K] : never
// };

export type FunctionPropertyNames<T> = {
   [K in keyof T]: IfFunctionType<T[K], K>
}[keyof T];
export type FunctionProperties<T> =
   FunctionPropertyNames<T> extends never ? BlankObject : Pick<T, FunctionPropertyNames<T>>;

export type GetterPropertyNames<T> = {
   [K in FunctionPropertyNames<T>]: IfGetter<T[K], K>;
}[FunctionPropertyNames<T>];
export type GetterProperties<T> =
   GetterPropertyNames<T> extends never ? BlankObject : Pick<T, GetterPropertyNames<T>>;

export type SetterPropertyNames<T> = {
   [K in FunctionPropertyNames<T>]: IfSetter<T[K], K>
}[FunctionPropertyNames<T>];
export type SetterProperties<T> =
   SetterPropertyNames<T> extends never ? BlankObject : Pick<T, SetterPropertyNames<T>>;

export type ReadablePropertyNames<T> =
   GetterPropertyNames<T> | ValuePropertyNames<T>;
export type ReadableProperties<T> =
   ReadablePropertyNames<T> extends never ? BlankObject : Pick<T, ReadablePropertyNames<T>>;
// export type OnlyReadableProperties<T> = {
//    [K in keyof T]: K extends ReadablePropertyNames<T> ? T[K] : never;
// };

export type OptionsBagPropertyNames<T> =
   ValuePropertyNames<T> | GetterPropertyNames<T> | SetterPropertyNames<T>;
export type OptionsBag<T> =
   OptionsBagPropertyNames<T> extends never ? BlankObject : Pick<T, OptionsBagPropertyNames<T>>;


