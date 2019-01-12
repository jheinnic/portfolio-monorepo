// $ExpectType true
export type Extend001 = never extends string ? true : false;

// $ExpectType false
export type Extend002 = string extends never ? true : false;

// $ExpectType boolean
export type Extend003 = any extends string ? true : false;

// $ExpectType true
export type Extend004 = string extends any ? true : false;

// $ExpectType true
export type Extend005 = never extends never ? true : false;

// $ExpectType boolean
export type Extend007 = any extends never ? true : false;

// $ExpectType true
export type Extend008 = never extends any ? true : false;

export const a: never = 'a' as never;
export const aa: any = 'a';
export const b: string = aa;

type Extends<T, U> = T extends U ? true : false;

// $ExpectType never
export type GenericExtend001 = Extends<never, string>;

// $ExpectType false
export type GenericExtend002 = Extends<string, never>;

// $ExpectType boolean
export type GenericExtend003 = Extends<any, string>;

// $ExpectType true
export type GenericExtend004 = Extends<string, any>;

// $ExpectType never
export type GenericExtend005 = Extends<never, never>;

// $ExpectType true
export type GenericExtend006 = Extends<any, any>;

// $ExpectType boolean
export type GenericExtend007 = Extends<any, never>;

// $ExpectType never
export type GenericExtend008 = Extends<never, any>;

// $ExpectType never
export type Extract001 = Extract<never, string>;

// $ExpectType never
export type Extract002 = Extract<string, never>;

// $ExpectType any
export type Extract003 = Extract<any, string>;

// $ExpectType string
export type Extract004 = Extract<string, any>;

// $ExpectType never
export type Extract005 = Extract<never, never>;

// $ExpectType any
export type Extract006 = Extract<any, any>;

// $ExpectType any
export type Extract007 = Extract<any, never>;

// $ExpectType never
export type Extract008 = Extract<never, any>;

// $ExpectType never
export type Exclude001 = Exclude<never, string>;

// $ExpectType string
export type Exclude002 = Exclude<string, never>;

// $ExpectType any
export type Exclude003 = Exclude<any, string>;

// $ExpectType never
export type Exclude004 = Exclude<string, any>;

// $ExpectType never
export type Exclude005 = Exclude<never, never>;

// $ExpectType never
export type Exclude006 = Exclude<any, any>;

// $ExpectType any
export type Exclude007 = Exclude<any, never>;

// $ExpectType never
export type Exclude008 = Exclude<never, any>;

export const foo: never = 'a' as never;
export const baz: any = 'a';

export let bar: string = foo;
bar = baz;
bar = foo;

