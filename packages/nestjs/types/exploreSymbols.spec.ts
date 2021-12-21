import { IToken, REGISTRY, IRegistryOf } from '@jchptf/nestjs';

export const AKey = Symbol('AKey');
export type AKey = typeof AKey;
export const BKey = Symbol('BKey');
export type BKey = typeof BKey;

export const ThingOne: unique symbol = Symbol('ThingOne');
export type ThingOne = typeof ThingOne;
export const ThingOneS: unique symbol = ThingOne as symbol;
export type ThingOneS = typeof ThingOneS;

export const ThingTwo: unique symbol = Symbol('ThingTwo');
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
export class FooRegistry {
   readonly [REGISTRY] = FooRegistry;
   static readonly [REGISTRY] = FooRegistry;
}
export class Foo {
   readonly [REGISTRY]: () => FooRegistry;

   [ThingOne]: ITypeOne[];
   [ThingTwo]: ITypeTwo;
}
export class Zoo {
   static readonly [REGISTRY] = BKey;

   [ThingOne]: number;
   [ThingTwo]: ITypeOne[];
   [ThingThree]: ITypeTwo;
   [ThingFour]: ITypeOne[];
}
// export function bless<Token extends keyof Foo>(token: Token): LocalProviderToken<Foo[Token], typeof Foo, Token>
// {
//     return token as LocalProviderToken<Foo[Token], typeof Foo, Token>;
// }
// export function press<Token extends keyof Foo>(token: Token): LocalProviderToken<Foo[Token], typeof Foo, symbol>
// {
//    const symbolic = token as symbol;
//    if (isLocalProviderToken<Foo[Token], typeof Foo, symbol>(symbolic, Foo)) {
//       return symbolic;
//    }
//
//    return undefined as never;
// }
// export function zuress<Token extends keyof Zoo>(token: Token): LocalProviderToken<Zoo[Token], typeof Zoo, symbol>
// {
//    const symbolic = token as symbol;
//    if (isLocalProviderToken<Zoo[Token], typeof Zoo, symbol>(symbolic, Zoo)) {
//       return symbolic;
//    }
//
//    return undefined as never;
// }

// $ExpectType FooRegistry
export type R01 = IRegistryOf<Foo>;
// $ExpectType boolean
export type R02 = IToken<Foo>;

// az1 = az2;
// az2 = az4;
// az4 = TypeZ2;
// az2 = r;
// az2 = s;
// r = az4;
//
// s = TypeD2;
// s = az2;
// s = TypeZ4;
//
// const ac1: TypeC1 = TypeC1;
// const ac2: TypeC2 = TypeC2;
// const ad1: TypeD1 = TypeD1;
// const ad2: TypeD2 = TypeD2;
