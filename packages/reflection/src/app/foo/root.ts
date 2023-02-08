declare namespace Models {
    export const AA = Symbol('AA')
    export type AA = typeof AA;

    export interface Stuff {
        [AA]: String;
    }

    export type IToken = keyof Stuff;
    export type ITokenType<T extends IToken> = Stuff[T];
}