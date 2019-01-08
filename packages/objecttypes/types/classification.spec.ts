// This example demonstrates that any is a union of every possible type.
// Some conceivable types are a restriction of SimpleManyPlaceholders, and
// others are not, therefore the expected type is 'A' | number, not just one
// value or the other.
import { Extends, Intersects } from '@jchptf/objecttypes';
import { Others, SimpleManyPlaceholders } from './fixtures';
import { StronglyExtends } from '../src';
import Include = Chai.Include;

// $ExpectType true
export type ExtendTest001 = Extends<SimpleManyPlaceholders, any>;

// $ExpectType true
export type ExtendTest002 = Extends<never, SimpleManyPlaceholders>;

// $ExpectType false
export type ExtendTest003 = Extends<any, SimpleManyPlaceholders>;

// $ExpectType false
export type ExtendTest004 = Extends<SimpleManyPlaceholders, never>;

// $ExpectType true
export type ExtendTest005 = Extends<any, any>;

// $ExpectType true
export type ExtendTest006 = Extends<never, never>;

// $ExpectType true
export type ExtendTest007 = Extends<never, any>;

// $ExpectType true
export type ExtendTest008 = Extends<any, never>;

// $ExpectType false
export type StrongExtendTest001 = StronglyExtends<SimpleManyPlaceholders, any>;

// $ExpectType false
export type StrongExtendTest002 = StronglyExtends<never, SimpleManyPlaceholders>;

// $ExpectType false
export type StrongExtendTest003 = StronglyExtends<any, SimpleManyPlaceholders>;

// $ExpectType false
export type StrongExtendTest004 = StronglyExtends<SimpleManyPlaceholders, never>;

// $ExpectType true
export type StrongExtendTest005 = StronglyExtends<any, any>;

// $ExpectType true
export type StrongExtendTest006 = StronglyExtends<never, never>;

// $ExpectType true
export type StrongExtendTest007 = StronglyExtends<never, any>;

// $ExpectType true
export type StrongExtendTest008 = StronglyExtends<any, never>;

// $ExpectType boolean
export type ExtendTest009 = Extends<string|boolean, string>;

// $ExpectType true
export type ExtendTest010 = Extends<Others, string>;

// $ExpectType false
export type ExtendTest011 = Extends<boolean, string>;

// $ExpectType true
export type ExtendTest012 = Extends<any, string>;

// $ExpectType true
export type ExtendTest013 = Extends<never, string>;

// $ExpectType false
export type ExtendTest014 = Extends<undefined, string>;

// $ExpectType false
export type ExtendTest015 = Extends<string, never>;

// $ExpectType never
export type IntersectTest001 = Intersects<string, never>;

// $ExpectType true
export type IncludingTest002 = Intersects<string, any>;

// $ExpectType true
export type IncludingTest003 = Intersects<string, string|boolean>;

// $ExpectType true
export type IncludingTest004 = Intersects<string, string>;

// $ExpectType false
export type IncludingTest005 = Intersects<string, boolean>;

// $ExpectType true **
export type IncludingTest006 = Intersects<string, Others>;

// $ExpectType false
export type IncludingTest007 = Intersects<string, undefined>;

// $ExpectType never
export type IntersectTest101 = Intersects<never, string>;

// $ExpectType true
export type IncludingTest102 = Intersects<any, string>;

// $ExpectType true
export type IncludingTest103 = Intersects<string|boolean, string>;

// $ExpectType true
export type IncludingTest104 = Intersects<string, string>;

// $ExpectType false
export type IncludingTest105 = Intersects<boolean, string>;

// $ExpectType true
export type IncludingTest106 = Intersects<Others, string>;

// $ExpectType false
export type IncludingTest107 = Intersects<undefined, string>;
