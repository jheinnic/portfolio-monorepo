"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_rsa_1 = require("node-rsa");
const api_1 = require("./api");
const keccak_1 = require("keccak");
const crypto_1 = require("crypto");
class KeyPair {
    constructor(rsaKeyPair, primes, hashString) {
        this.rsaKeyPair = rsaKeyPair;
        this.primes = primes;
        this.hashString = hashString;
    }
    static createNewKey(options = api_1.defaults) {
        const rsaKeyPair = new node_rsa_1.RSA({ b: options.privateKeyBits });
        const publicPem = rsaKeyPair.exportKey('public').split(/-\n|\n-/)[1];
        const publicBytes = Buffer.from(publicPem, 'base64');
        const shakeHash = keccak_1.createShake('shake256');
        const hashString = shakeHash.update(publicBytes).digest();
        const primes = new Array(options.primeCount);
        for (let ii = 0; ii < options.primeCount; ii++) {
            primes[ii] = crypto_1.createDiffieHellman(32).getPrime();
        }
        return new KeyPair(rsaKeyPair, primes, hashString);
    }
}
exports.KeyPair = KeyPair;
