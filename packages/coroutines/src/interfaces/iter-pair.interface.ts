export interface IIterPair<T> {
   readonly iterator: Iterator<T>;
   readonly iterable: Iterable<T>;
};
