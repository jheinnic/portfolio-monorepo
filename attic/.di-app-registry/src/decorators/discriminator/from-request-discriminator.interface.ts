/**
 * The FromRequest discriminator variant specifies a PropertyKey path that can be
 * navigated, starting from an @installerRequest annotated request message root,
 * to reach a value of type IDirector<interfaces.BindingWhenSyntax>.
 *
 * The referenced IDirector captures the logic to build a requester-specified
 * disambiguating Where clause and can be passed a BindingWhenSyntax builder to
 * apply that path, just as readily as the other discriminator subtypes may be
 * interpreted/applied-to instances of BindingWhenSyntax.
 *
 * The PropertyKeys that appear under path must define a chain of navigable references
 * followed by a single value reference of type IDirector<interfaces.BindingWhenSyntax>.
 * If any PropertyKey along the path happens to be of an Array type, the di-app-registry
 * components that interpret it will avoid rejecting the input entirely by taking
 * the 0'th element, but there is no other support for indexing any other elements.
 *
 * The best recommendation for any case where non-zero path elements are desired calls for
 * modeling a unary reference to desired array element combined with validation constraints
 * to capture 'IsAMemberOf' invariant constraint between that unary reference and any
 * array where it is expected to be included.
 *
 * Unlike the other Discriminator subtypes, it is more common to see FromRequest appear
 * on request properties that request caller left Undefined.  Since request caller
 * sets referenced IDirector value, and responding installer has opted to defer its
 * notion of import location to that caller, there is no need to use a locator from
 * message metadata to bridge between requester and installer DI namespaces.  Instead
 * of creating a Dynamic Binding at runtime, both parties negotiate agreement on a shared
 * disambiguation each will use directly.
 */
import {Path} from '@thi.ng/api';

export interface FromRequestDiscriminator {
   type: 'fromRequest';
   path: Path;
}
