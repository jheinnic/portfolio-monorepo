# @jchptf/tupletypes

[![npm (scoped)](https://img.shields.io/npm/v/@jchptf/tupletypes.svg)](https://www.npmjs.com/package/@jchptf/tupletypes)
![npm downloads](https://img.shields.io/npm/dm/@jchptf/tupletypes.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/jchptf_monorepo.svg?style=flat-square&label=twitter)](https://twitter.com/jchptf_monorepo)


This project is part of the
[@jchptf/portfolio-monorepo](https://github.com/jheinnic/portfolio-monorepo/) monorepo.

<!-- TOC depthFrom:2 depthTo:3 -->

<!-- /TOC -->

## About

This library is intended to provide a suite of <i><b>practical</b></i> tools for manipulations on tuples that involve 
changing tuple lengths.  This includes operations like concatenation, appending, shifting, unshifting, pushing,
popping, slicing, and splicing.

There are a number of inventive solutions that can be found on the internet for performing these operations using 
a trick called "type recursion" that yields much more compact looking solutions than you'll find in the source code 
here, and those solutions have the advantage of having no upper bound limiting the kinds of tuples they may be used 
upon.

So why would anyone be interested in an alternative that has a finite limit on applicable array size, with
a more lines of implementation in its source code?  The answer is that the recursive approaches stretch apply
typescript's compiler in ways it was not intended to be used, with severe consequences for compiler performance and 
memory consumption.  Recursive solutions are fine when applied only to very small use cases, but have a dangerous 
potential due to their unbounded application potential to cause compilation time to spin out of control and eventually
fail by virtue of resource exhaustion.

This package works by providing a finite number of size-indexed solutions that do not require recursion, but they only
work to the number of tuple lengths for which an indexed solution is given.  Consider the following example involving a
tuple of length 5:

```typescript
type MyTuple = [1, 2, 3, 4, 5];
const myTuple: MyTuple = [1, 2, 3, 4, 5];
```

Javascript arrays have a slice operation that can be used to describe two endpoints and return the resulting subarrays.
The start an end points can be referenced from the left using the index values of ```0``` through ```length() - 1```,
and from the right using the index values ```0 - length()``` through ```-1```.  For example:

```typescript
myTuple.slice(1, 4);
[2, 3, 4]
myTuple.slice(-4, -1);
[2, 3, 4]
myTuple.slice(-5, 2)
[1, 2]
myTuple.slice(0, -2)
[1, 2, 3]
```

This library uses indexed types to provide equivalent operations on the types.  Because of that, it cannot use negative
values to express the last three examples above, and instead uses four different base types to express the four
combinations of ```To``` or ```From``` with ```Left``` or ```Right```

```typescript
type SliceOne   = LLSlice<MyTuple, 1, 4>;
type SliceTwo   = RRSlice<MyTuple, 4, 1>;
type SliceThree = RLSlice<MyTuple, 5, 2>;
type SliceFour  = LRSlice<MyTuple, 0, 2>;
```

The implementation makes indexed access into an array of derivations that typescript is able to expand eagerly, rather
than requiring a series of deferred recursions.  The indexed solution is able to hard code information about the input
and output tuple shapes that the recursive solutons have to reach by induction.

```typescript
// For LLSlice<1, 4>
type LLSlice<T extends any[], From, To> = [
   //...
   [
      //...
      [
         //...
         [T[1], T[2], T[3]]
         //...
      ]
      //...
   ],
   ///.
][T["length"]][From][To]
```

## Installation

```bash
yarn add @jchptf/tupletypes
```

## Dependencies

- TODO...

## Usage examples

```typescript
import * as t from "@jchptf/tupletypes";
```

## Authors

- John Heinnickel

## License

&copy; 2018 John Heinnickel // MIT Software License
