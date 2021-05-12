import {LocalProviderToken} from '@jchptf/nestjs';

export const AKey = Symbol('AKey')
export type AKey = typeof AKey;

export const ThingOne = Symbol('ThingOne');
export const ThingTwo = Symbol('ThingTwo');

export interface TypeOne {
   a: number;
   b: boolean;
}

export interface TypeTwo {
   a: 'right' | 'left';
   b: number | boolean;
}

export class Foo {
   public static readonly [AKey] = 5;

   public [ThingOne]: TypeOne[];
   public [ThingTwo]: TypeTwo;
}

export function bless<Token extends keyof Foo>(token: Token): LocalProviderToken<Foo[Token], typeof Foo, Token>
{
    return token as LocalProviderToken<Foo[Token], typeof Foo, Token>;
}

// $ExpectType boolean
export type TypeA1 = LocalProviderToken<Array<{}>, typeof Foo, ThingOne>;

// $ExpectType boolean
export type TypeB1 = LocalProviderToken<Array<{}>, typeof Foo, ThingOne>;

// $ExpectType boolean
export type TypeA2 = bless(ThingOne);

// $ExpectType boolean
export type TypeB2 = bless(ThingTwo);

// $ExpectType boolean
export type TypeA3 = LocalProviderToken<string, typeof Foo, ThingOne>;

// $ExpectType boolean
export type TypeB3 = LocalProviderToken<string, typeof Foo, ThingOne>;

// $ExpectType boolean
export type TypeA4 = LocalProviderToken<Array<ThingTwo>, typeof Foo, ThingOne>;

// $ExpectType boolean
export type TypeB4 = LocalProviderToken<Array<ThingTwo>, typeof Foo, ThingOne>;

