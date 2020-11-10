import { LocalProviderToken, MODULE_ID } from '@jchptf/nestjs';

export const AKey = Symbol('AKey');
export type AKey = typeof AKey;

export const ThingOne = Symbol('ThingOne');
export type ThingOne = typeof ThingOne;

export const ThingTwo = Symbol('ThingTwo');
export type ThingTwo = typeof ThingTwo;

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
// $ExpectType boolean
export let TypeA1: LocalProviderToken<Array<{}>, typeof Foo, ThingOne>;
// $ExpectType boolean
export let TypeB1: LocalProviderToken<Array<{}>, typeof Foo, ThingTwo>;
// $ExpectType boolean
export let TypeA2 = bless(ThingOne);
// $ExpectType boolean
export let TypeA22: typeof TypeA2;
// $ExpectType boolean
export let TypeB2 = bless(ThingTwo);
// $ExpectType boolean
export let TypeB22: typeof TypeB2;
// $ExpectType boolean
export let TypeA3: LocalProviderToken<string, typeof Foo, ThingOne>;
// $ExpectType boolean
export let TypeB3: LocalProviderToken<string, typeof Foo, ThingTwo>;
// $ExpectType boolean
export let TypeA4: LocalProviderToken<ITypeTwo[], typeof Foo, ThingOne>;
// $ExpectType boolean
export let TypeB4: LocalProviderToken<ITypeTwo[], typeof Foo, ThingTwo>;
