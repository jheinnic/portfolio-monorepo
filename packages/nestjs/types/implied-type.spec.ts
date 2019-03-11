// This example demonstrates that any is a union of every possible type.
// Some conceivable types are a restriction of SimpleManyPlaceholders, and
// others are not, therefore the expected type is 'A' | number, not just one
// value or the other.
import {
   Nominal, ImpliedName, ImpliedType, ImpliedValue,
   DynamicProviderToken, HasImpliedType, IsImpliedType, TokenDictionary,
   getModuleIdentifier, getNamedTypeIntent, getLocalProviderToken, getGlobalProviderToken,
} from '@jchptf/nestjs';
import {
   HollowThing, Unicycle, Class,
   ISomething, OneSubclass, AnotherSubclass,
   SomethingOne, SomethingTwo, SomethingThree
} from './fixtures';

type HollowString = Nominal<string, "Hollow", HollowThing>;

type HollowProviderToken = DynamicProviderToken<HollowThing>;

// $ExpectType string
export type ImpliedTest001 = ImpliedValue<HollowString>;

// $ExpectType "Hollow"
export type ImpliedTest002 = ImpliedName<HollowString>;

// $ExpectType HollowThing
export type ImpliedTest003 = ImpliedType<HollowString>;

// $ExpectType string
export type ImpliedTest004 = ImpliedValue<HollowProviderToken>;

// $ExpectType "ProviderToken" & "Local" & "Dynamic"
export type ImpliedTest005 = ImpliedName<HollowProviderToken>;

// $ExpectType HollowThing
export type ImpliedTest006 = ImpliedType<HollowProviderToken>;

// $ExpectType true
export type HasImpliedTest001 = HasImpliedType<HollowThing, HollowProviderToken>;

// $ExpectType true
export type HasImpliedTest002 = HasImpliedType<HollowThing, HollowString>;

// $ExpectType true
export type HasImpliedTest003 = HasImpliedType<HollowThing, HollowProviderToken>;

// $ExpectType true
export type RevHasImpliedTest007 =
   HasImpliedType<ImpliedType<HollowProviderToken>, HollowProviderToken>;

// $ExpectType true
export type RevHasImpliedTest008 = HasImpliedType<ImpliedType<HollowString>, HollowString>;

// $ExpectType true
export type RevHasImpliedTest010 = HasImpliedType<ImpliedType<HollowString>, HollowProviderToken>;

// $ExpectType true
export type RevHasImpliedTest012 = HasImpliedType<ImpliedType<HollowProviderToken>, HollowString>;

// $ExpectType true
export type IsImpliedTest001 = IsImpliedType<HollowThing, HollowProviderToken>;

// $ExpectType true
export type IsImpliedTest002 = IsImpliedType<HollowThing, HollowString>;

// $ExpectType true
export type IsImpliedTest003 = IsImpliedType<HollowThing, HollowProviderToken>;

// $ExpectType false
export type IsImpliedTest004 = IsImpliedType<Unicycle, HollowProviderToken>;

// $ExpectType false
export type IsImpliedTest005 = IsImpliedType<Unicycle, HollowString>;

// $ExpectType false
export type IsImpliedTest006 = IsImpliedType<Unicycle, HollowProviderToken>;

// $ExpectType true
export type RevIsImpliedTest001 =
   IsImpliedType<ImpliedType<HollowProviderToken>, HollowProviderToken>;

// $ExpectType true
export type RevIsImpliedTest002 = IsImpliedType<ImpliedType<HollowString>, HollowProviderToken>;

// $ExpectType true
export type RevIsImpliedTest003 =
   IsImpliedType<ImpliedType<HollowProviderToken>, HollowProviderToken>;

// $ExpectType true
export type RevIsImpliedTest004 = IsImpliedType<ImpliedType<HollowString>, HollowString>;

// $ExpectType true
export type RevIsImpliedTest005 = IsImpliedType<ImpliedType<HollowString>, HollowProviderToken>;

// $ExpectType true
export type RevIsImpliedTest006 = IsImpliedType<ImpliedType<HollowProviderToken>, HollowString>;

const MY_MOD = getModuleIdentifier('My.Mod');
const CLASS_ID = getNamedTypeIntent<Class>('Class');
const SOMETHING_ID = getNamedTypeIntent<ISomething>('Something');
const FOO = getLocalProviderToken<Class>(MY_MOD, CLASS_ID, 'LocalClass');
const BAR = getGlobalProviderToken<ISomething>(SOMETHING_ID, 'GlobalClass');

interface ITemplate {
   foo: Class;
   bar: ISomething;
}

const diDict: TokenDictionary<ITemplate> = {
   foo: FOO,
   bar: BAR,
};

type fooType = typeof diDict.foo;

type barType = typeof diDict.bar;

// $ExpectType true
type MigratedTest001 = IsImpliedType<Class, fooType>;

// $ExpectType Class
type MigratedTest001B = ImpliedType<fooType>;

// $ExpectType true
type MigratedTest002 = IsImpliedType<ISomething, barType>;

// $ExpectType ISomething
type MigratedTest002B = ImpliedType<barType>;

// $ExpectType false
type MigratedTest003 = IsImpliedType<ISomething, fooType>;

// $ExpectType false
type MigratedTest004 = IsImpliedType<number, fooType>;

// $ExpectType false
type MigratedTest005 = IsImpliedType<Class, barType>;

// $ExpectType false
type MigratedTest006 = IsImpliedType<number, barType>;

// $ExpectType false
type MigratedTest007 = IsImpliedType<OneSubclass, fooType>;

// $ExpectType false
type MigratedTest008 = IsImpliedType<AnotherSubclass, fooType>;

// $ExpectType false
type MigratedTest009 = IsImpliedType<SomethingOne, barType>;

// $ExpectType false
type MigratedTest010 = IsImpliedType<SomethingTwo, barType>;

// $ExpectType false
type MigratedTest011 = IsImpliedType<SomethingThree, barType>;

// $ExpectType true
type MigratedTest012 = HasImpliedType<OneSubclass, fooType>;

// $ExpectType true
type MigratedTest013 = HasImpliedType<AnotherSubclass, fooType>;

// $ExpectType true
type MigratedTest014 = HasImpliedType<SomethingOne, barType>;

// $ExpectType true
type MigratedTest015 = HasImpliedType<SomethingTwo, barType>;

// $ExpectType true
type MigratedTest016 = HasImpliedType<SomethingThree, barType>;
