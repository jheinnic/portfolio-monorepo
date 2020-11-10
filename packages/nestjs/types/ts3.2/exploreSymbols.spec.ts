import { isLocalProviderToken, LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';

export const AKey = Symbol('AKey');
export type AKey = typeof AKey;

export const ThingOne = Symbol('ThingOne');
export type ThingOne = typeof ThingOne;
export const ThingOneS = ThingOne as symbol;
export type ThingOneS = typeof ThingOneS;

export const ThingTwo = Symbol('ThingTwo');
export type ThingTwo = typeof ThingTwo;
export const ThingTwoS = ThingTwo as symbol;
export type ThingTwoS = typeof ThingTwoS;

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
