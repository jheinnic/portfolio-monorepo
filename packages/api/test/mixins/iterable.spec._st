import { expect } from 'chai';
import { unsupported } from '@thi.ng/errors';

import { iterableOn } from '@jchptf/api';
import { HasIterableProp } from '../fixtures';

describe('iterableOn', () => {
   class ControlType implements Iterable<string>
   {
      [Symbol.iterator](): IterableIterator<string>
      {
         throw unsupported("This class didn't mix the iterableOf behavior in");
      }

      getIterable: Iterable<string> = ['abc', 'def', 'xyz'];
   }

   @iterableOn('getIterable')
   class MixedType extends HasIterableProp
   {
      [Symbol.iterator](): IterableIterator<string>
      {
         throw unsupported('This class did mix the iterableOf behavior in');
      }

      getIterable: Iterable<string> = ['abc', 'def', 'xyz'];
   }

   let control: ControlType;
   let controlAfter: ControlType;
   let mixed: MixedType;

   const expectedOrder = ['abc', 'def', 'xyz'];

   beforeEach(() => {
      control = new HasIterableProp();
      mixed = new MixedType();
      controlAfter = new HasIterableProp();
   });

   describe('before mixin', () => {
      it('Does not iterate through instance', () => {
         expect(() => {
            const stringIter = control[Symbol.iterator]();
            for (const item of control) {
               console.log(item, stringIter, 'Before');
            }
            console.log([...control]);
            return [...control];
         })
            .to
            .throw();
      });

      it('Iterates correctly through property de-reference', () => {
         expect([...control.getIterable])
            .to
            .deep
            .equal(expectedOrder);
      });
   });

   describe('with mixin', () => {
      it('Iterates correctly through instance', () => {
         expect([...mixed])
            .to
            .deep
            .equal(expectedOrder);
      });

      it('Iterates correctly through property de-reference', () => {
         expect([...mixed.getIterable])
            .to
            .deep
            .equal(expectedOrder);
      });
   });

   describe('after, without mixin', () => {
      it('Does not iterate through instance', () => {
         iterableOn('getIterable')(ControlType);
         expect(() => {
            return console.log([...controlAfter]);
         })
            .to
            .throw();
      });

      it('Iterates correctly through property de-reference', () => {
         iterableOn('getIterable')(ControlType);
         expect([...controlAfter.getIterable])
            .to
            .deep
            .equal(expectedOrder);
      });

      it('Iterates correctly for instances after late decoration', () => {
         iterableOn('getIterable')(ControlType);
         const mixinAfter = new ControlType();
         expect([...mixinAfter])
            .to
            .deep
            .equal(expectedOrder);
      });

      it('Does not iterate through instances before late decoration', () => {
         expect(() => {
            return console.log([...controlAfter]);
         })
            .to
            .throw();

         iterableOn('getIterable')(ControlType);

         expect(() => {
            return console.log([...controlAfter]);
         })
            .to
            .throw();

         const mixinAfter = new ControlType();
         expect([...mixinAfter])
            .to
            .deep
            .equal(expectedOrder);

         expect(() => {
            return console.log([...controlAfter]);
         })
            .to
            .throw();

         expect([...mixinAfter])
            .to
            .deep
            .equal(expectedOrder);
      });
   });
});
