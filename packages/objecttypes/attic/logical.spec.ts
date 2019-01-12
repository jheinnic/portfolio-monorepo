import { Extends, SetXor, AssertTrue } from '@jchptf/objecttypes';
import { ManyPlaceholders, More, Others, SimpleManyPlaceholders } from './fixtures';
import { ObjectType } from 'simplytyped';

// $ExpectType never
export type Test001 = SetXor<string, string>;

// $ExpectType never
export type Test002 = Exclude<SetXor<string, number>, string|number>;

// $ExpectType SetXor<string, number>
export type Test002b = Extract<SetXor<string, number>, string|number>;

// $ExpectType "a" | "e" | "c"
export type Test003 = SetXor<More, Others>;

// $ExpectType "a" | "e" | "c"
export type Test004 = SetXor<Others, More>;

// $ExpectType SimpleManyPlaceholders | ManyPlaceholders
export type Test005 = AssertTrue<Extends<ObjectType<SetXor<SimpleManyPlaceholders, ManyPlaceholders>>, SimpleManyPlaceholders>>;

export type Test005 = AssertTrue<Extends<SetXor<SimpleManyPlaceholders, ManyPlaceholders>, SimpleManyPlaceholders>>;
