import {RSA} from 'node-rsa';
import {defaults, KeyPairOptions} from './api';
import {createShake} from 'keccak';
import {createDiffieHellman} from 'crypto';


export class KeyPair
{
   public constructor(public rsaKeyPair: RSA, public primes: Array<Buffer>,  public hashString: Buffer)
   {

   }

   public static createNewKey(options: KeyPairOptions = defaults)
   {
      const rsaKeyPair = new RSA({b: options.privateKeyBits});
      const publicPem = rsaKeyPair.exportKey('public').split(/-\n|\n-/)[1];
      const publicBytes = Buffer.from(publicPem, 'base64');

      const shakeHash = createShake('shake256');
      const hashString = shakeHash.update(publicBytes).digest();

      const primes = new Array<Buffer>(options.primeCount);
      for (let ii=0; ii<options.primeCount; ii++) {
         primes[ii] = createDiffieHellman(32).getPrime();

      }

      return new KeyPair(rsaKeyPair, primes, hashString);
   }
}