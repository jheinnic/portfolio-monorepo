export type Not<Predicate extends boolean> =
   Predicate extends false ? true : Predicate extends true ? false : never;

export type And<P1 extends boolean, P2 extends boolean> = If<P1, P2, false>;

export type Or<P1 extends boolean, P2 extends boolean> = If<P1, true, P2>;

/**
 * True if P is true, False if P is false, undefined if P is boolean, and never if
 * P happens to be true and false.
 */
export type TrueOrFalse<P extends boolean> =
   true extends P
      ? false extends P
         ? undefined
         : true
      : false extends P
         ? false
         : never;

export type StrictIf<Predicate extends boolean, Then, Else, Ambiguous = never> =
   TrueOrFalse<Predicate> extends true
      ? Then
      : TrueOrFalse<Predicate> extends false
      ? Else
      : Ambiguous;

export type If<Predicate extends boolean, Then, Else> =
   Predicate extends true ? Then : Else;

export type Unless<Predicate extends boolean, Then, Else> =
   Predicate extends false ? Then : Else;
