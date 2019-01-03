/// <reference types="node" />
import { RSA } from 'node-rsa';
import { KeyPairOptions } from './api';
export declare class KeyPair {
    rsaKeyPair: RSA;
    primes: Array<Buffer>;
    hashString: Buffer;
    constructor(rsaKeyPair: RSA, primes: Array<Buffer>, hashString: Buffer);
    static createNewKey(options?: KeyPairOptions): KeyPair;
}
