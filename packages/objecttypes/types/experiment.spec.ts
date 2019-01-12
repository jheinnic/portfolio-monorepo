// import { HasType, IsExactType, NotHasType } from "conditional-type-checks";
import {
   Awesome, FinalFour, Foo, IOne, More, Others, SimpleManyPlaceholders, SimplePlaceholder, Some, Super
} from './fixtures';
import {
   Extends, If, Intersects, IsAny, IsExactly, IsNever, KeysExcluding, KeysExtendedBy, KeysExtending,
   KeysIntersecting, KeysNotExtendedBy, KeysNotExtending, KeysNotStronglyExtendedBy,
   KeysNotStronglyExtending, KeysStronglyExtendedBy, KeysStronglyExtending, KeysThatAre, KeysThatAreNot,
   Not, HasAll, HasAny
} from '@jchptf/objecttypes';

// $ExpectType never
export type Test001 = Extract<Foo, string>;

// $ExpectType Foo
export type Test002 = Exclude<Foo, string>;

// $ExpectType true
export type Test003 = never extends Test001 ? true : false;

// $ExpectType true
export type Test004 = Test001 extends never ? true : false;

// $ExpectType true
export type Test005 = never extends Test002 ? true : false;

// $ExpectType false
export type Test006 = Test002 extends never ? true : false;

// $ExpectType Others
export type Test007 = Extract<Awesome, Super>;

// $ExpectType true
export type Test008 = IsExactly<Others, Extract<Awesome, Super>>;

// $ExpectType false
export type Test009 = More extends Some ? true : false;

// $ExpectType true
export type Test010 = Some extends More ? true : false;

// $ExpectType false
export type Test011 = Awesome extends Super ? true : false;

// $ExpectType false
export type Test012 = Super extends Awesome ? true : false;

// $ExpectType true
export type Test013 = IsExactly<'b' | 'd', Extract<Awesome, Super>>;

// $ExpectType "c"
export type Test014 = Exclude<More, Awesome | Super>;

// $ExpectType "c"
export type Test015 = Extract<Exclude<More, Awesome>, Exclude<More, Super>>;

// $ExpectType true
export type Test016 = SimpleManyPlaceholders extends any ? true : false;

// This example demonstrates that any is a union of every possible type.
// Some conceivable types are a restriction of SimpleManyPlaceholders, and
// others are not, therefore the expected type is "A" | number, not just one
// value or the other.
// $ExpectType number | "A"
export type Test017 = any extends SimpleManyPlaceholders ? number : 'A';

// $ExpectType false
export type Test018 = SimpleManyPlaceholders extends never ? true : false;

// $ExpectType true
export type Test019 = never extends SimpleManyPlaceholders ? true : false;

// $ExpectType true
export type Test020 = Extends<SimpleManyPlaceholders, any>;

// $ExpectType false
export type Test021 = Extends<SimpleManyPlaceholders, never>;

// $ExpectType true
export type Test022 = Extends<any, SimpleManyPlaceholders>;

// $ExpectType true
export type Test023 = Extends<never, SimpleManyPlaceholders>;

// $ExpectType true
export type Test024 = Extends<SimpleManyPlaceholders, SimplePlaceholder>;

// $ExpectType "a" | "h"
export type Test025 = KeysThatAre<IOne, string>;

// $ExpectType "b" | "d" | "e" | "c" | "f" | "g" | "i" | "j" | "k" | "l"
export type Test026 = KeysThatAreNot<IOne, string>;

// $ExpectType "d" | "a" | "c" | "f" | "h" | "j" | "k"
export type Test027 = KeysExtending<IOne, string>;

// $ExpectType "b" | "e" | "g" | "i" | "l"
export type Test027b = KeysNotExtending<IOne, string>;

// $ExpectType "b" | "d" | "a" | "h" | "i" | "k"
export type Test028 = KeysExtendedBy<IOne, string>;

// $ExpectType "e" | "c" | "f" | "g" | "j" | "l"
export type Test028b = KeysNotExtendedBy<IOne, string>;

// $ExpectType "e" | "f" | "g" | "l"
export type Test029 = KeysExcluding<IOne, string>;

// $ExpectType "b" | "d" | "a" | "c" | "h" | "i" | "j" | "k"
export type Test030 = KeysIntersecting<IOne, string>;

// $ExpectType "a" | "c" | "f" | "h" | "j"
export type Test031a = KeysStronglyExtending<IOne, string>;

// $ExpectType "b" | "d" | "e" | "g" | "i" | "k" | "l"
export type Test031b = KeysNotStronglyExtending<IOne, string>;

// $ExpectType "b" | "d" | "a" | "h" | "i" | "k"
export type Test031c = KeysStronglyExtendedBy<IOne, string>;

// $ExpectType "e" | "c" | "f" | "g" | "j" | "l"
export type Test031d = KeysNotStronglyExtendedBy<IOne, string>;

// $ExpectType true
export type Test032 = IsExactly<Extract<SimpleManyPlaceholders, any>, SimpleManyPlaceholders>;

// $ExpectType false
export type Test033 = Extends<SimplePlaceholder, SimpleManyPlaceholders>;

// $ExpectType never
export type Test034 = Extract<SimplePlaceholder, SimpleManyPlaceholders>; // ** SimplePlaceholder

// $ExpectType SimpleManyPlaceholders
export type Test035 = Extract<SimpleManyPlaceholders, SimplePlaceholder>; // ** SimplePlaceholder

// $ExpectType false
export type Test036 = Extends<FinalFour, Others>;

// $ExpectType true
export type Test036b = Extends<Others, FinalFour>;

// $ExpectType false
export type Test037 = Extends<Super, Awesome>; // ** false

// $ExpectType false
export type Test037b = Extends<Awesome, Super>; // ** false

// $ExpectType true
export type Test038 = SimpleManyPlaceholders extends SimplePlaceholder ? true : false;

type ReallyExtends<T, U> = Exclude<U, Extract<T, U>> extends never ? true : false;

// $ExpectType false
export type Test039 = ReallyExtends<Super, Awesome>;

// $ExpectType true
export type Test039b = ReallyExtends<More, Some>;

// $ExpectType false
export type Test039c = ReallyExtends<Some, More>;

// $ExpectType never
export type Test040 = Extract<string, Others>;

// $ExpectType Others
export type Test041 = Exclude<Others, Test040>;

// $ExpectType false
export type Test042 = IsNever<Test041>;

// $ExpectType false
export type Test043 = ReallyExtends<string, Others>;

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

// $ExpectType Others
export type Test057 = Extract<Others, string>;

// $ExpectType string
export type Test058 = Exclude<string, Others>;

// $ExpectType never
export type Test059 = Extract<string, Others>;

// $ExpectType true
export type Test060 = Extends<string, any>;

// $ExpectType true
export type Test061 = Intersects<string, any>;

// $ExpectType false
export type Test062 = Not<Intersects<string, any>>;

// $ExpectType false
export type Test063 = IsExactly<string, any>;

// $ExpectType false
export type Test065 = Not<Extends<string, any>>;

// $ExpectType false
export type Test066 = Not<Extends<any, string>>;

// $ExpectType false
export type Test067 = Not<Intersects<any, string>>;

// $ExpectType any
export type Test068 = Extract<any, string>;

// $ExpectType true
export type Test069 = IsExactly<any, any>;

// $ExpectType false
export type Test070 = IsExactly<string, any>;

// $ExpectType false
export type Test071 = IsExactly<any, string>;

// $ExpectType false
export type Test072 = IsNever<Exclude<any, string>>;

// $ExpectType false
export type Test073 = IsNever<Extract<any, string>>;

// $ExpectType true
export type Test074 = IsNever<Exclude<string, any>>;

// $ExpectType false
export type Test075 = IsNever<Extract<string, any>>;

// $ExpectType false
export type Test076 = HasAll<string, any>;

// $ExpectType true
export type Test077 = IsExactly<any, any>;

// $ExpectType false
export type Test078 = IsExactly<string, any>;

// $ExpectType false
export type Test079 = If<IsExactly<any, any>, IsExactly<string, any>, 'a'>;

// export type IsAny<T> = Extends<[any], [T]>;
// export type IsAny<T> = Not<IsNeverType<Extract<T, never>>>;

// $ExpectType false
export type Test080 = If<true, false, true>;

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

// $ExpectType true
export type Test087 = Intersects<any, string>;

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
// // $ExpectType "a"
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

// $ExpectType any
export type Test104 = Exclude<any, Extract<'t', any>>;

// $ExpectType "t"
export type Test105 = Extract<'t', any>;

// $ExpectType any
export type Test106 = Exclude<any, object | string | number | null | undefined | boolean>;

// $ExpectType "a"
export type Test107 = IsAny<Test104, 'a', 'b'>;

type SomeAny = any;

// $ExpectType "a"
export type Test108 = IsAny<SomeAny, 'a', 'b'>;

// $ExpectType "a"
export type Test100 = IsAny<any, 'a', 'b'>;
