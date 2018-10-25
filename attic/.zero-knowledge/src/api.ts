export interface KeyPairOptions
{
   privateKeyBits: number;
   hashDigestBytes: number;
   // hashIterCount: number;
   primeCount: number;
}

export const defaults: KeyPairOptions = {
   privateKeyBits: 2048,
   hashDigestBytes: 24,
   // hashIterCount: 120,
   primeCount: 2,
}

/**
 *
 * @typedef K Typedef for the present implementor, which may be the secret augmentation of some
 *            other ancestor Knowledge subtype, B, encapsulation the public portion of its knowledge.
 * @typedef B Optional subtype for secret knowledge instances that extend a shared public
 *            knowledge implementor, B.
 */
export interface Knowledge<K extends B & Knowledge<K>, B extends Knowledge<B> = K>
{
}

/**
 * Captures the inputs and outputs of a program execution considered to be common given knowledge,
 * known and/or accessible to all.
 */
export interface PublicKnowledge<K extends PublicKnowledge<K>> extends Knowledge<K, K>
{

}

/**
 * Augments some set of common public knowledge with the incremental portion that has been privately
 * shared with trusted parties.  It encapsulates secret/protected program inputs and their code path
 * derived outputs.
 */
export interface PrivateKnowledge<K extends PrivateKnowledge<K, B>, B extends PublicKnowledge<B>>
  extends PublicKnowledge<B>, Knowledge<K>
{
}
/*
export type VerifyingKey<K extends PrivateKnowledge<K, B>, B extends PublicKnowledge<B>> = {};

export type ProvingKey<K extends PrivateKnowledge<K, B>, B extends PublicKnowledge<B>> = {};

/**
 * Service component responsible for locating Snark public keys produced by prior analysis of a given
 * program model's name.
 */
/*
export interface ProgramModelCatalog
{
   lookupVerifyingKey<K extends PrivateKnowledge<K, B>, B extends PublicKnowledge<B>>(): VerifyingKey<K, B>;

   lookupProvingKey<K extends PrivateKnowledge<K, B>, B extends PublicKnowledge<B>>(): ProvingKey<K, B>;
}
*/

// export interface Destoryable {
//    close(): void;
// }


export interface Proof<K extends PrivateKnowledge<K, B>, B extends PublicKnowledge<B>>
{

}

interface Witness<K extends PrivateKnowledge<K, B>, B extends PublicKnowledge<B>>
{
   createProof( ):

   verifyProof( )
}

export interface ProgramModel<K extends PrivateKnowledge<K, B>, B extends PublicKnowledge<B>>
{
   getWitness( privateKnowledge: K ): Witness<K, B>;

}

