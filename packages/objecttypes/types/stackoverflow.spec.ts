type XOr<T, U> = Exclude<T, U> | Exclude<U, T>;
type IsNeverType<T> = [T] extends [never] ? true : false;
type IsExactly<T, U> = IsNeverType<XOr<U, T>>;
type IsAnyTypeOne<T> = IsExactly<T, any>;
type IsAnyTypeTwo<T> = IsExactly<any, T>;
type IsAnyType<T> = [T] extends [any] ? true : false;

// $ExpectType true
export type Test001 = IsAnyTypeOne<any>;
// $ExpectType true
export type Test002 = IsAnyTypeOne<any>;
// $ExpectType true
export type Test003 = IsExactly<any, any>;
// $ExpectType true
export type Test004 = IsAnyType<any>;

export type TrueOrFalse<P extends boolean> =
   true extends P
      ? false extends P
      ? undefined
      : true
      : false extends P
      ? false
      : never;
type If<Predicate extends boolean, Then, Else, Ambiguous = never> =
   TrueOrFalse<Predicate> extends true
      ? Then
      : TrueOrFalse<Predicate> extends false
      ? Else
      : Ambiguous;
type StringIfSameElseNumber<T, U> =
   If<IsExactly<T, U>, string, number>;
type StringIfAnyElseNumber<T> =
   If<IsExactly<T, any>, string, number>;

type FixedStringIfAnyElseNumber<T> =
   If<IsAnyType<T>, string, number>;

// $ExpectType string
export type Test005 = StringIfSameElseNumber<any, any>;

// $ExpectType number
export type Test006 = StringIfSameElseNumber<number, any>;

// $ExpectType number
export type Test007 = StringIfSameElseNumber<any, boolean>;

// $ExpectType number
export type Test008 = StringIfSameElseNumber<number, boolean>;

// $ExpectType string
export type Test009 = StringIfSameElseNumber<boolean, boolean>;

// $ExpectType string
export type Test010 = StringIfSameElseNumber<number, number>;

// $ExpectType number
export type Test011 = StringIfSameElseNumber<'f', string>;

// $ExpectType number
export type Test012 = StringIfSameElseNumber<number, 7>;

// $ExpectType number
export type Test013 = StringIfSameElseNumber<string, 'f'>;

// $ExpectType number
export type Test014 = StringIfSameElseNumber<7, number>;

// $ExpectType string
export type Test200 = FixedStringIfAnyElseNumber<any>;

// $ExpectType string
export type Test201 = StringIfAnyElseNumber<any>;

// $ExpectType number
export type Test202 = StringIfAnyElseNumber<number>;

// $ExpectType number
export type Test203 = StringIfAnyElseNumber<boolean>;

// $ExpectType number
export type Test204 = StringIfAnyElseNumber<'f'>;

// $ExpectType number
export type Test205 = StringIfAnyElseNumber<7>;

// $ExpectType number
export type Test206 = StringIfAnyElseNumber<false>;

// $ExpectType number
export type Test207 = StringIfAnyElseNumber<true>;

// $ExpectType number
export type Test208 = StringIfAnyElseNumber<keyof any>;
