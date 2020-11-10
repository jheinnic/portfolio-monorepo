import { LocalProviderToken } from '@jchptf/nestjs';
export declare const AKey: unique symbol;
export declare type AKey = typeof AKey;
export declare const BKey: unique symbol;
export declare type BKey = typeof BKey;
export declare const ThingOne: unique symbol;
export declare type ThingOne = typeof ThingOne;
export declare const ThingOneS: symbol;
export declare type ThingOneS = typeof ThingOneS;
export declare const ThingTwo: unique symbol;
export declare type ThingTwo = typeof ThingTwo;
export declare const ThingTwoS: symbol;
export declare type ThingTwoS = typeof ThingTwoS;
export declare const ThingThree: unique symbol;
export declare type ThingThree = typeof ThingThree;
export declare const ThingThreeS: symbol;
export declare type ThingThreeS = typeof ThingThreeS;
export declare const ThingFour: unique symbol;
export declare type ThingFour = typeof ThingFour;
export declare const ThingFourS: symbol;
export declare type ThingFourS = typeof ThingFourS;
export interface ITypeOne {
    a: number;
    b: boolean;
}
export interface ITypeTwo {
    a: 'right' | 'left';
    b: number | boolean;
}
export declare class Foo {
    [ThingOne]: ITypeOne[];
    [ThingTwo]: ITypeTwo;
}
export declare class Zoo {
    [ThingOne]: number;
    [ThingTwo]: ITypeOne[];
    [ThingThree]: ITypeTwo;
    [ThingFour]: ITypeOne[];
}
export declare function bless<Token extends keyof Foo>(token: Token): LocalProviderToken<Foo[Token], typeof Foo, Token>;
export declare function press<Token extends keyof Foo>(token: Token): LocalProviderToken<Foo[Token], typeof Foo, symbol>;
export declare function zuress<Token extends keyof Zoo>(token: Token): LocalProviderToken<Zoo[Token], typeof Zoo, symbol>;
export declare type TypeA1 = LocalProviderToken<Array<{}>, typeof Foo, ThingOne>;
export declare type TypeB1 = LocalProviderToken<Array<{}>, typeof Foo, ThingTwo>;
export declare const TypeA2: any;
export declare type TypeA2 = typeof TypeA2;
export declare const TypeB2: any;
export declare type TypeB2 = typeof TypeB2;
export declare type TypeA3 = LocalProviderToken<string, typeof Foo, ThingOne>;
export declare type TypeB3 = LocalProviderToken<string, typeof Foo, ThingTwo>;
export declare type TypeA4 = LocalProviderToken<ITypeTwo[], typeof Foo, ThingOne>;
export declare type TypeB4 = LocalProviderToken<ITypeTwo[], typeof Foo, ThingTwo>;
export declare type TypeC1 = LocalProviderToken<Array<{}>, typeof Foo, ThingOneS>;
export declare type TypeD1 = LocalProviderToken<Array<{}>, typeof Foo, ThingTwoS>;
export declare const TypeC2: any;
export declare type TypeC2 = typeof TypeC2;
export declare const TypeD2: any;
export declare type TypeD2 = typeof TypeD2;
export declare type TypeC3 = LocalProviderToken<string, typeof Foo, ThingOneS>;
export declare type TypeD3 = LocalProviderToken<string, typeof Foo, ThingTwoS>;
export declare type TypeC4 = LocalProviderToken<ITypeTwo[], typeof Foo, ThingOneS>;
export declare type TypeD4 = LocalProviderToken<ITypeTwo[], typeof Foo, ThingTwoS>;
export declare const TypeZ1: any;
export declare const TypeZ2: any;
export declare const TypeZ3: any;
export declare const TypeZ4: any;
export declare type TypeZ1 = typeof TypeZ1;
export declare type TypeZ2 = typeof TypeZ2;
export declare type TypeZ3 = typeof TypeZ3;
export declare type TypeZ4 = typeof TypeZ4;
export declare let r: TypeC2;
export declare let s: TypeD2;
export declare let az1: TypeZ1;
export declare let az2: TypeZ2;
export declare let az3: TypeZ3;
export declare let az4: TypeZ4;
//# sourceMappingURL=exploreSymbols.spec.d.ts.map