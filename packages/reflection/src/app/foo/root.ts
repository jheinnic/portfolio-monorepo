export const AA = Symbol('AA');
export type AA = typeof AA;

export namespace Models {
    export class Stuff {
        public [AA]: String;
    }

    export type IToken = keyof Stuff;
    export type ITokenType<T> = T extends IToken ? Stuff[T] : never;
}