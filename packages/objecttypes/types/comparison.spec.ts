import {
   Awesome, FinalFour, Foo, IOne, More, Others, SimpleManyPlaceholders, SimplePlaceholder, Some, Super
} from './fixtures';
import {
   Excludes, Extends, HasAll, HasAny, If, IsExactly, IsNever, KeysAcceptedBy, KeysAccepting,
   KeysExcluding, KeysThatAre, KeysThatAreNot, Not
} from '@jchptf/objecttypes';
import { Keys } from 'simplytyped';

// $ExpectType true
export type Test008 = IsExactly<Others, Extract<Awesome, Super>>;

// $ExpectType true
export type Test009 = IsExactly<"b" | "d", Extract<Awesome, Super>>;

// $ExpectType true
export type Test010 = IsExactly<"c", Exclude<More, Awesome | Super>>;

// $ExpectType true
export type Test011 = IsExactly<"c", Extract<Exclude<More, Awesome>, Exclude<More, Super>>>;

// $ExpectType true
export type Test032 = IsExactly<Extract<SimpleManyPlaceholders, any>, SimpleManyPlaceholders>;

// $ExpectType true
export type Test016 = HasAll<any, SimpleManyPlaceholders>;

// $ExpectType false
export type Test017 = HasAll<SimpleManyPlaceholders, any>;

// $ExpectType true
export type Test018 = HasAll<SimpleManyPlaceholders, never>; // ** true

// $ExpectType false
export type Test020 = HasAll<never, SimpleManyPlaceholders>;

// $ExpectType false
export type Test021 = HasAll<SimpleManyPlaceholders, SimplePlaceholder>;

// $ExpectType false
export type Test023 = HasAll<SimplePlaceholder, SimpleManyPlaceholders>;

// $ExpectType false
export type Test033 = HasAll<SimplePlaceholder, SimpleManyPlaceholders>;

// $ExpectType true
export type Test024 = HasAny<SimplePlaceholder, SimpleManyPlaceholders>;

// $ExpectType true
export type Test019 = HasAny<any, SimpleManyPlaceholders>; // ** true

// $ExpectType true
export type Test022 = HasAny<SimpleManyPlaceholders, SimplePlaceholder>;

/*
// $ExpectType true
export type Test036 = HasType<FinalFour, Others>;

// $ExpectType true
export type Test037 = HasType<Super, Awesome>; // ** false

// $ExpectType Test137
export type Test137 = {
   [K in Keys<IOne>]: IsExactType<IOne[K], string> extends true ? K : never;
};

// $ExpectType { a: "a"; b: never; c: never; d: never; e: never; f: never; g: never; h: never; i: never; j:
// never; k: never; l: never; }
export const foo: Test137 = {
   a: 'a',
   b: null as never,
   c: null as never,
   d: null as never,
   e: null as never,
   f: null as never,
   g: null as never,
   h: null as never,
   i: null as never,
   j: null as never,
   k: null as never,
   l: null as never
};

// $ExpectType true
export type Test038 = SimpleManyPlaceholders extends SimplePlaceholder ? true : false;

type ReallyHasType<T, U> = Exclude<U, Extract<T, U>> extends never ? true : false;

// $ExpectType false
export type Test039 = ReallyHasType<Super, Awesome>;

// $ExpectType never
export type Test040 = Extract<string, Others>;

// $ExpectType "b" | "d"
export type Test041 = Exclude<Others, Test040>;

// $ExpectType false
export type Test042 = IsNeverType<Test041>;

// $ExpectType false
export type Test043 = ReallyHasType<string, Others>;

// $ExpectType true
export type Test044 = HasAll<string, Others>;

// $ExpectType false
export type Test045 = HasAll<Others, string>;

// $ExpectType true
export type Test046 = HasAny<string, Others>;

// $ExpectType true
export type Test047 = HasAny<Others, string>;

// $ExpectType true
export type Test048 = HasAll<keyof any, Others>;

// $ExpectType false
export type Test049 = HasAll<Others, keyof any>;

// $ExpectType true
export type Test050 = HasAny<keyof any, Others>;

// $ExpectType true
export type Test051 = HasAny<Others, keyof any>;

// $ExpectType false
export type Test052 = Extends<string, Others>;

// $ExpectType true
export type Test053 = Extends<Others, string>;

// $ExpectType false
export type Test054 = Extends<keyof any, Others>;

// $ExpectType true
export type Test055 = Extends<Others, keyof any>;

// $ExpectType never
export type Test056 = Exclude<Others, string>;

// $ExpectType "b" | "d"
export type Test057 = Extract<Others, string>;

// $ExpectType string
export type Test058 = Exclude<string, Others>;

// $ExpectType never
export type Test059 = Extract<string, Others>;

// $ExpectType false
export type Test060 = HasAll<string, any>;

// $ExpectType true
export type Test061 = HasAny<string, any>;

// $ExpectType false
export type Test062 = Excludes<string, any>;

// $ExpectType false
export type Test063 = IsExactly<string, any>;

// $ExpectType true
export type Test064 = HasPartial<string, any>;

// $ExpectType false
export type Test065 = NotHasType<string, any>;

// $ExpectType true
export type Test066 = NotHasType<any, string>;

// $ExpectType false
export type Test067 = Excludes<any, string>;

// $ExpectType any
export type Test068 = Extract<any, string>;

// $ExpectType true
export type Test069 = IsExactly<any, any>;

// $ExpectType false
export type Test070 = IsExactly<string, any>;

// $ExpectType false
export type Test071 = IsExactly<any, string>;

// $ExpectType false
export type Test072 = IsNeverType<Exclude<any, string>>;

// $ExpectType false
export type Test073 = IsNeverType<Extract<any, string>>;

// $ExpectType true
export type Test074 = IsNeverType<Exclude<string, any>>;

// $ExpectType false
export type Test075 = IsNeverType<Extract<string, any>>;

// $ExpectType false
export type Test076 = HasAll<string, any>;

// $ExpectType true
export type Test077 = IsExactly<any, any>;

// $ExpectType false
export type Test078 = IsExactly<string, any>;

// $ExpectType false
export type Test079 = If<IsExactly<any, any>, IsExactly<string, any>, 'a'>;

// export type IsAny<T> = Extends<[any], [T]>;
export type IsAny<T> = Not<IsNeverType<Extract<T, never>>>;

// export type DoHasAll<T, U> = If<IsExactly<U, any>, IsExactly<T, any>, IsExactly<Extract<U, T>, U>>;
export type DoHasAll<T, U> = Not<IsNeverType<If<IsAny<U>, IsAny<T>, 'b'>>>;

// $ExpectType false
export type Test080 = If<true, false, true>;

// $ExpectType false
export type Test081 = DoHasAll<string, any>;

export type SampleOne<T> = IsExactly<T, any>;
export type SampleTwo<T> = IsExactly<any, T>;

// $ExpectType false
export type Test082 = IsAny<number>;

// $ExpectType true
export type Test083 = IsAny<any>;

// $ExpectType true
export type Test084 = IsExactly<any, any>;

const food: any = 5;
export const bar: string = food;

// $ExpectType any
export type Test085 = Extract<any, never>;

// $ExpectType never
export type Test086 = Extract<string, never>;

// $ExpectType false
export type Test087 = HasPartial<any, string>;

// // $ExpectType true
// export type Test088 = HasPartial<Others, string>;
//
// // $ExpectType false
// export type Test089 = HasPartial<string, Others>;
//
// // $ExpectType true
// export type Test090 = HasPartial<Others, More>;
//
// // $ExpectType false
// export type Test091 = HasPartial<More, Others>;
//
// // $ExpectType never
// export type Test092 = Exclude<string, any>;
//
// // $ExpectType any
// export type Test093 = Exclude<any, string>;
//
// // $ExpectType never
// export type Test094 = Exclude<Others, string>;
//
// // $ExpectType string
// export type Test095 = Exclude<string, Others>;
//
// // $ExpectType never
// export type Test096 = Exclude<Others, More>;
//
// // $ExpectType "a" | "e" | "c"
// export type Test097 = Exclude<More, Others>;
//
// // $ExpectType string
// export type Test098 = Extract<string, any>;
//
// // $ExpectType any
// export type Test099 = Extract<any, string>;
//
// // $ExpectType 'a'
// export type Test100 = Extract<Others, string>;
//
// // $ExpectType never
// export type Test101 = Extract<string, Others>;
//
// // $ExpectType "b" | "d"
// export type Test102 = Extract<Others, More>;
//
// // $ExpectType "b" | "d"
// export type Test103 = Extract<More, Others>;
*/