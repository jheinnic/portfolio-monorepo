/// <reference types="node" />
import { KeyPairLocator } from '../interface/locators';
export declare class PublicKeyContent {
    readonly locator: KeyPairLocator;
    readonly publicKeyX: Buffer;
    readonly publicKeyY: Buffer;
    constructor(template: Required<PublicKeyContent>);
}
//# sourceMappingURL=public-key-content.value.d.ts.map