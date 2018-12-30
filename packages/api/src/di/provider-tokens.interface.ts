import {StringKeys} from 'simplytyped';

const roleTag = Symbol('roleTag');
const typeTag = Symbol('typeTag');

class NominalTag<Role extends string, Type> {
   // @ts-ignore
   private [roleTag]: Role|undefined = undefined;

   // @ts-ignore
   private [typeTag]: Type|undefined = undefined;
}

/**
 * Nominal, as defined scoped to this file, is used to play some compiler trickery to achieve stronger
 * typing with dependency injection tokens.  It works by fooling the compiler into believing that each
 * {@bold instance string} literal type bound to type variable {@code Inst}, is actually type by both
 * {@code Inst} and a second {@bold role string} type bound to {@code Role}.  {@code Inst & Role} is
 * an impossible type for any string in the wild to match, which causes the compiler to not accept any
 * coincidental string where a Nominal type alias has been used.
 *
 * Nominal is not used directly in application code.  It is reused by exposed types that each represent a
 * function role for typed string identifiers.  Exported type aliases like {@code IntentQualifier} and
 * {@code ProviderToken} each bind a literal string value for Role's binding, and expose the Inst binding
 * to their consumers as a type variable.  Inst should never be given a value that matches the chosen
 * value for Role, as this would allow the compiler to reduce the intersection {@code Inst & Role} to
 * {@code Role}.
 *
 * In truth, type aliases defined by a Nominal type instance only store a string matching {@bold Inst}
 * Typescript's compiler is tricked into believing the impossible intersection of that string and
 * {@bold Role} by a utility function that blesses a given name string by forcefully applying the
 * impossibly typecast to {@code Inst & Role}.  This illusion only exists in the compiler--when rendered
 * as runtime JavaScript, no manifestation of any Role strings will remain--only the {@bold instance string}
 * will survive to compiled output.
 */
type Nominal<Name extends string, Role extends string, Type> = Name & NominalTag<Role, Type>;

export type ImpliedName<N extends Nominal<string, string, any>> = N extends Nominal<infer Name, string, any> ? Name : string;

export type ImpliedRole<N extends Nominal<string, string, any>> = N extends Nominal<string, infer Role, any> ? Role : string;

export type ImpliedType<N extends Nominal<string, string, any>> = N extends Nominal<string, string, infer Type> ? Type : any;


export type IntentQualifier<Intent extends string> = Nominal<string, 'Intent' & Intent, any>

export type ModuleIdentifier = IntentQualifier<'ModuleIdentifier'>

export type ProviderName = IntentQualifier<'ProviderName'>

export type ProviderToken1<T extends any, Name extends string, Domain extends string = 'Global'> =
   Nominal<Name, 'ProviderToken' & Domain, T> & ProviderName

export type ProviderToken<Type, Name extends string = string> = Nominal<Name, 'ProviderToken', Type> & ProviderName

// export type GlobalProviderToken<T extends any, Name extends string = string> =
//    Nominal<string, 'GlobalProviderToken'> & ProviderToken<T, Name>;

export type DynamicProviderToken<T extends any, Name extends string> =
   Nominal<Name, 'DynamicProviderToken', T>

// export type TokenDictionary2<P extends ProviderToken<any, string> = ProviderToken<any, string>, D extends IBagOf<any, P> = IBagOf<any, P>> = {
//    [K in P]: TokenType<K>;
// };

// export type TokenDictionary1<Local extends object, Scope extends string = 'Global', Global extends object = {}> = {
//    [K in StringKeys<Local> & StringKeys<Global>]:
//    K extends StringKeys<Local>
//       ? ProviderToken<Local[K], K, Scope>
//       : ProviderToken<Global[K], K>
// }

export type TokenDictionary<Local extends object> = { [K in StringKeys<Local>]: ProviderToken<Local[K], K> }
