import {
   getGlobalProviderToken, getLocalProviderToken, getModuleIdentifier, getNamedTypeIntent,
   HasImpliedType,
   ImpliedType,
   IsImpliedType,
   TokenDictionary
} from '@jchptf/nestjs';
import {
   AnotherSubclass, Class, ISomething, OneSubclass, SomethingOne, SomethingThree, SomethingTwo
} from './fixtures';

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