import {KeyPair} from './key-pair.class';

public class KeyPairWitness {
   private attributes: (any | Buffer)[];

   constructor( public readonly hashBytes: Buffer, public readonly primes: Array<Buffer> ) {
      this.attributes = [...this.hashBytes, this.primes];

   }

   public getAttributes() {
      return this.attributes;
   }

   public static witnessKeyPair(source: KeyPair) {
      return new KeyPairWitness(source.hashString, [ ...source.primes ]);
   }
}