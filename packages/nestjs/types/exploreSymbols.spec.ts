import { isLocalProviderToken, LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';

export const AKey = Symbol('AKey');
export type AKey = typeof AKey;
export const BKey = Symbol('BKey');
export type BKey = typeof BKey;

export const ThingOne = Symbol('ThingOne');
export type ThingOne = typeof ThingOne;
export const ThingOneS = ThingOne as symbol;
export type ThingOneS = typeof ThingOneS;

export const ThingTwo = Symbol('ThingTwo');
export type ThingTwo = typeof ThingTwo;
export const ThingTwoS = ThingTwo as symbol;
export type ThingTwoS = typeof ThingTwoS;

export const ThingThree = Symbol('ThingThree');
export type ThingThree = typeof ThingThree;
export const ThingThreeS = ThingThree as symbol;
export type ThingThreeS = typeof ThingThreeS;

export const ThingFour = Symbol('ThingTwo');
export type ThingFour = typeof ThingFour;
export const ThingFourS = ThingFour as symbol;
export type ThingFourS = typeof ThingFourS;

export interface ITypeOne {
   a: number;
   b: boolean;
}
export interface ITypeTwo {
   a: 'right' | 'left';
   b: number | boolean;
}
export class Foo {
   static readonly [MODULE_ID] = AKey;

   [ThingOne]: ITypeOne[];
   [ThingTwo]: ITypeTwo;
}
export class Zoo {
   static readonly [MODULE_ID] = BKey;

   [ThingOne]: number;
   [ThingTwo]: ITypeOne[];
   [ThingThree]: ITypeTwo;
   [ThingFour]: ITypeOne[];
}
export function bless<Token extends keyof Foo>(token: Token): LocalProviderToken<Foo[Token], typeof Foo, Token>
{
    return token as LocalProviderToken<Foo[Token], typeof Foo, Token>;
}
export function press<Token extends keyof Foo>(token: Token): LocalProviderToken<Foo[Token], typeof Foo, symbol>
{
   const symbolic = token as symbol;
   if (isLocalProviderToken<Foo[Token], typeof Foo, symbol>(symbolic, Foo)) {
      return symbolic;
   }

   return undefined as never;
}
export function zuress<Token extends keyof Zoo>(token: Token): LocalProviderToken<Zoo[Token], typeof Zoo, symbol>
{
   const symbolic = token as symbol;
   if (isLocalProviderToken<Zoo[Token], typeof Zoo, symbol>(symbolic, Zoo)) {
      return symbolic;
   }

   return undefined as never;
}
// $ExpectType boolean
export type TypeA1 = LocalProviderToken<Array<{}>, typeof Foo, ThingOne>;
// $ExpectType boolean
export type TypeB1 = LocalProviderToken<Array<{}>, typeof Foo, ThingTwo>;
// $ExpectType boolean
export const TypeA2 = bless(ThingOne);
// $ExpectType boolean
export type TypeA2 = typeof TypeA2;
// $ExpectType boolean
export const TypeB2 = bless(ThingTwo);
// $ExpectType boolean
export type TypeB2 = typeof TypeB2;
// $ExpectType boolean
export type TypeA3 = LocalProviderToken<string, typeof Foo, ThingOne>;
// $ExpectType boolean
export type TypeB3 = LocalProviderToken<string, typeof Foo, ThingTwo>;
// $ExpectType boolean
export type TypeA4 = LocalProviderToken<ITypeTwo[], typeof Foo, ThingOne>;
// $ExpectType boolean
export type TypeB4 = LocalProviderToken<ITypeTwo[], typeof Foo, ThingTwo>;

// $ExpectType boolean
export type TypeC1 = LocalProviderToken<Array<{}>, typeof Foo, ThingOneS>;
// $ExpectType boolean
export type TypeD1 = LocalProviderToken<Array<{}>, typeof Foo, ThingTwoS>;
// $ExpectType boolean
export const TypeC2 = press(ThingOne);
// $ExpectType boolean
export type TypeC2 = typeof TypeC2;
// $ExpectType boolean
export const TypeD2 = press(ThingTwo);
// $ExpectType boolean
export type TypeD2 = typeof TypeD2;
// $ExpectType boolean
export type TypeC3 = LocalProviderToken<string, typeof Foo, ThingOneS>;
// $ExpectType boolean
export type TypeD3 = LocalProviderToken<string, typeof Foo, ThingTwoS>;
// $ExpectType boolean
export type TypeC4 = LocalProviderToken<ITypeTwo[], typeof Foo, ThingOneS>;
// $ExpectType boolean
export type TypeD4 = LocalProviderToken<ITypeTwo[], typeof Foo, ThingTwoS>;

// $ExpectType boolean
export const TypeZ1 = zuress(ThingOne);
export const TypeZ2 = zuress(ThingTwo);
export const TypeZ3 = zuress(ThingThree);
export const TypeZ4 = zuress(ThingFour);

// $ExpectType boolean
export type TypeZ1 = typeof TypeZ1;
// $ExpectType boolean
export type TypeZ2 = typeof TypeZ2;
// $ExpectType boolean
export type TypeZ3 = typeof TypeZ3;
// $ExpectType boolean
export type TypeZ4 = typeof TypeZ4;

// $ExpectType boolean
export let r: TypeC2 = TypeC2;
// $ExpectType boolean
export let s: TypeD2 = TypeD2;
// r = s;
// s = r;

// $ExpectType boolean
export let az1: TypeZ1 = TypeZ1;
// $ExpectType boolean
export let az2: TypeZ2 = TypeZ2;
// $ExpectType boolean
export let az3: TypeZ3 = TypeZ3;
// $ExpectType boolean
export let az4: TypeZ4 = TypeZ4;

az1 = az2;
az2 = az4;
az4 = TypeZ2;
az2 = r;
az2 = s;
r = az4;

s = TypeD2;
s = az2;
s = TypeZ4;

let ac1: TypeC1 = TypeC1;
let ac2: TypeC2 = TypeC2;
let ad1: TypeD1 = TypeD1;
let ad2: TypeD2 = TypeD2;



