export interface IterPair<T> {
   readonly iterator: Iterator<T>;
   readonly iterable: Iterable<T>;
};
