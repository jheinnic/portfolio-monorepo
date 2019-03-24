import {
   Nominal, ImpliedName, ImpliedType, ImpliedValue,
   DynamicProviderToken, HasImpliedType, IsImpliedType,
} from '@jchptf/nestjs';
import { HollowThing, Unicycle } from './fixtures';

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
