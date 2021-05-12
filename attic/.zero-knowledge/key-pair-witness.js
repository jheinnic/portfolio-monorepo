"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeyPairWitness {
    constructor(hashBytes, primes) {
        this.hashBytes = hashBytes;
        this.primes = primes;
        this.attributes = [...this.hashBytes, this.primes];
    }
    getAttributes() {
        return this.attributes;
    }
    static witnessKeyPair(source) {
        return new KeyPairWitness(source.hashString, [...source.primes]);
    }
}
