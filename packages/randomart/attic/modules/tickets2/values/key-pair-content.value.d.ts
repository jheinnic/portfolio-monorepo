/// <reference types="node" />
import { KeyPairLocator } from '../interface/locators';
export declare class KeyPairContent {
    readonly locator: KeyPairLocator;
    readonly publicKeyX: Buffer;
    readonly publicKeyY: Buffer;
    readonly privateKey: Buffer;
    constructor(locator: KeyPairLocator, publicKeyX: Buffer, publicKeyY: Buffer, privateKey: Buffer);
}
//# sourceMappingURL=key-pair-content.value.d.ts.map