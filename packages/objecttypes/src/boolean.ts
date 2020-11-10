/* * True if P is true, False if P is false, undefined if P is boolean, and Then & Else if
 * P happens to be true and false.
// export type StrictIf<Predicate extends boolean, Then, Else> =
//    TrueOrFalse<Predicate> extends true
//       ? Then
//       : TrueOrFalse<Predicate> extends false
//          ? Else
//          : Then | Else;
*/

/**
 * Resolves to:
 * -- Then iff Predicate is true (Default: true)
 * -- Else iff Predicate is false (Default: false)
 * -- Then | Else iff Predicate is true | false (Default: Then | Else),
 * -- Then & Else iff Predicate is true & false (Default: Then & Else)
 */
export type If<Predicate extends boolean, Then = true, Else = false, Ambiguous = Then | Else, Paradox = never> =
   true extends Predicate
      ? (false extends Predicate ? Ambiguous : Then)
      : (false extends Predicate ? Else : Paradox);

export type WeakIf<Predicate extends boolean, Then = true, Else = false, Paradox = never> =
   If<Predicate, Then, Else, Then, Paradox>;

export type StrictIf<Predicate extends boolean, Then = true, Else = false, Paradox = never> =
   If<Predicate, Then, Else, Else, Paradox>;

/**
 * Resolves to Then iff Predicate is either false or boolean.
 * Resolves to Else iff Predicate is true.
 */
export type Not<Predicate extends boolean, Then = true, Else = false, Ambiguous = Then | Else, Paradox = never> =
   false extends Predicate
      ? (true extends Predicate ? Ambiguous : Then)
      : (true extends Predicate ? Else : Paradox);

export type WeakNot<Predicate extends boolean, Then = true, Else = false, Paradox = never> =
   Not<Predicate, Then, Else, Then, Paradox>;

export type StrictNot<Predicate extends boolean, Then = true, Else = false, Paradox = never> =
   Not<Predicate, Then, Else, Else, Paradox>;

// type WithP2<Predicate extends boolean, A, B, C> = If<Predicate, A, B, A|B, C>;

export type And<P1 extends boolean, P2 extends boolean, Then = true, Else = false,
  Ambiguity = Then | Else, Paradox = never> =
   // If<P1, If<P2, Then, Else>, Else, If<P2, Then | Else, Else, Then | Else, Else>, If<P2, Then & Else, Else, Else, Then & Else>>;
   If<P1, If<P2, Then, Else, Ambiguity, Paradox>, Else,
     If<P2, Ambiguity, Else, Ambiguity, Paradox>, If<P2, Paradox, Else, Paradox, Paradox>>;

export type Or<P1 extends boolean, P2 extends boolean, Then = true, Else = false,
  Ambiguity = Then | Else, Paradox = never> =
   // If<P1, Then, If<P2, Then, Else, Then | Else, Then & Else>, If<P2, Then, Then | Else, Then | Else, Else>, If<P2, Then, Then & Else, Then, Then & Else>>;
   If<P1, Then, If<P2, Then, Else, Ambiguity, Paradox>,
     If<P2, Then, Ambiguity, Ambiguity, Ambiguity>, If<P2, Then, Paradox, Ambiguity, Paradox>>;

export type TrueOrFalse<Predicate extends boolean> = If<Predicate, true, false, never>;
