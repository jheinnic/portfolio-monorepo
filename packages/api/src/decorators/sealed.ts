/**
 * Class decorator. Seals both constructor and prototype.
 *
 * @param constructor
 */
export function sealed(constructor: NewableFunction): void {
   Object.seal(constructor);
   Object.seal(constructor.prototype);
}
