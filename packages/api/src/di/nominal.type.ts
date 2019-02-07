const nameTag = Symbol('nameTag');
const typeTag = Symbol('typeTag');

class NominalTag<Name extends string, Type>
{
   public [nameTag]: Name;

   public [typeTag]: Type;
   //
   // constructor(name: Name, type: Type) {
   //    this[nameTag] = name;
   //    this[typeTag] = type;
   //    console.log(this[nameTag], this[typeTag]);
   // }
   //
   // public setName(name: Name) {
   //    this[nameTag] = name;
   // }
   //
   // public setType(type: Type) {
   //    this[typeTag] = type;
   // }
}

/**
 * Nominal, as defined scoped to this file, is used to play some compiler trickery to achieve
 * stronger typing with dependency injection tokens.  It works by fooling the compiler into
 * believing that each {@bold instance string} literal type bound to type variable {@code Value},
 * is actually type by both {@code Value} and a second {@bold name string} type bound to {@code
 * Name}.  {@code Value & Name} is an impossible type for any string in the wild to match, which
 * causes the compiler to not accept any coincidental string where a Nominal type alias has been
 * used.
 *
 * Nominal is not used directly in application code.  It is reused by exposed types that each
 * represent a function role for typed string identifiers.  Exported type aliases like
 * {@code IntentQualifier} and {@code ProviderToken} each bind a literal string value for Name's
 * binding, and expose the Value binding to their consumers as a type variable.  Value should never
 * be given a value that matches the chosen value for Name, as this would allow the compiler to
 * reduce the intersection {@code Value & Name} to {@code Name}.
 *
 * In truth, type aliases defined by a Nominal type instance only store a string matching
 * {@bold Value} Typescript's compiler is tricked into believing the impossible intersection of
 * that value and {@bold Name} by a utility function that blesses a given name string by forcefully
 * applying an impossible typecast to {@code Value & Name}.  This illusion only exists in
 * compiler--when rendered as runtime JavaScript, no manifestation of any Name strings will
 * remain--only the {@bold instance string} will survive to compiled output.
 */
export type Nominal<Value, Name extends string, Type> = Value & NominalTag<Name, Type>;
