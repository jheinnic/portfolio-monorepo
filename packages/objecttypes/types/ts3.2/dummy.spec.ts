import { KeysThatAre, KeysAccepting, KeysAcceptedBy, KeysExcluding, KeysThatAreNot, KeysPartiallyAcceptedBy, KeysPartiallyAccepting } from '@jchptf/objecttypes';
import { IOne } from '../fixtures';

// $ExpectType 'a' | 'b'
export type Test025 = KeysThatAre<IOne, string>;

// $ExpectType 'f'
export type Test026 = KeysThatAreNot<IOne, string>;

// $ExpectType number
export type Test027 = KeysAccepting<IOne, string>;

// $ExpectType number
export type Test028 = KeysAcceptedBy<IOne, string>;

// $ExpectType number
export type Test029 = KeysPartiallyAcceptedBy<IOne, string>;

// $ExpectType number
export type Test030 = KeysPartiallyAccepting<IOne, string>;

// $ExpectType any
export type Test031 = KeysExcluding<IOne, string>;

// export const aa: Test025 = 5;