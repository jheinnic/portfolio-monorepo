import {IBagOf} from '@jchptf/api';

type RandomizeTags = 'PrngAlgorithm' | 'EntropyOrigin';

export const RANDOMIZE_TAGS: IBagOf<symbol, RandomizeTags> = {
   PrngAlgorithm: Symbol.for('PrngAlgorithm'),
   EntropyOrigin: Symbol.for('EntropyOrigin')
};

type AlgorithmKinds = 'ISAAC' | 'HMAC-DRBG' | 'NodeCrypto'

export const PRNG_ALGORITHM_KINDS: IBagOf<symbol, AlgorithmKinds> = {
   ISAAC: Symbol.for('ISAAC'),
   'HMAC-DRBG': Symbol.for('HMAC-DRBG'),
   NodeCrypto: Symbol.for('NodeCrypto')
};

type EntropySourceKinds =
   'RandomOrg'
   | 'Hardware'
   | 'NativeOS'
   | 'LocalFixture'
   | 'SharedFixture'
   | 'FakeDev'

export const ENTROPY_SOURCE_KINDS: IBagOf<symbol, EntropySourceKinds> = {
   RandomOrg: Symbol.for('RandomOrg'),
   Hardware: Symbol.for('Hardware'),
   NativeOS: Symbol.for('NativeOS'),
   LocalFixture: Symbol.for('LocalFixture'),
   SharedFixture: Symbol.for('SharedFixture'),
   FakeDev: Symbol.for('FakeDev')
};
