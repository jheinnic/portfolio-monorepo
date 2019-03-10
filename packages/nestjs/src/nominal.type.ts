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
 * believing that each literal value of type {@code Value}, is typed both by {@code Value} as
 * well as a second fictional class, {@code NominalTag<Name, Type>}.  The fictional
 * {@code NominalTag} has two type variables that come from {@code Nominal}'s last two type
 * variables.
 *
 * Nominal, which means "existing in name alone" is named so because {@code NominalTag} is never
 * instantiated.  There are no literal values from the {@code Value} type that will ever actually
 * match the intersected {@code NominalTag} class.  In truth, any value of type {@code Value}
 * can be carried by a variable of type {@code Nominal<Value, Name, Type>}, but the compiler will
 * only accept a literal that has been explicitly typecast to a {@code Nominal} type with compatible
 * {@code Name} and {@code Value} types.   There is no need for the {@code NominalTag} class to
 * ever be created for typescript to enforce that {@code Value} instances that are also
 * {@code Nominal<Value, Name, Type> instances must be typed by an intersection of {@code Value}
 * and {@code NominalTag<Name, Type}}.  Furthermore, the only modification to a {@code Value}
 * instance needed to satisfy this requirement is to attach the compile-time information of a
 * cast to {@code Nominal<Value, Name, Type>}.  After compilation is done, all traces of the
 * fictional {@code NominalTag} class disappear.
 * {@code
 *
 * {@code NominalTag<Name, Type>} is an impossible type for any {@code Value}} to match in the
 * wild, causing TypeScript's compiler to not accept any coincidental string where a Nominal type
 * alias has been assigned by explicit typecast.
 *
 * Nominal should not appear in "top-level" application code.  It should only be used to create new
 * types for use in the "top-level" application code that is built over the abstractions created
 * by those types.  For the common case of string literals typed by their functional role, see the
 * utility type {@code StringQualifier<Name, Type>}.  Exposed type aliases like
 * {@code TypeIdentifier} and {@code BaseProviderToken} each bind a literal string value for Name's
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
export type Nominal<Value, Name extends string, Type = any> = Value & NominalTag<Name, Type>;
