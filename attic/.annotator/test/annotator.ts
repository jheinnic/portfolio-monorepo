import {Annotator, Constructor, IAnnotator} from '../src';
import 'reflect-metadata';

class AnnotationProps
{
   constructor(public readonly name: string, public readonly size: number) { }
}

describe('Annotator', () => {
   let sut: IAnnotator;

   beforeEach('Create Annotated', function (done) {
      sut = new Annotator();
      done();
   });

   it('getType(Constructor)', () => {
      console.log(sut.getType(AnnotationProps));
   });

   it('makeActiveClassAnnotation', () => {
      function myHandler(clazz: Constructor<SomeClass>, annotation: AnnotationProps): Function
      {
         console.log('My handler class:', clazz);
         console.log('My handler annotation:', annotation);

         return class extends clazz
         {
            constructor(...args: any[])
            {
               super(...args);
               console.log(`Augmented ${this} constructor call with ${args} of ${typeof args[0]}`);
            }
         }
      }

      const Annotated = sut.makeActiveClassAnnotation(AnnotationProps, myHandler);

      @Annotated('name', 12)
      class SomeClass
      {
         private _foo: number;

         constructor(boo: number)
         {
            console.log(typeof(
              boo
            ));
            this._foo = boo + boo;
         }

         get foo(): number
         {
            return this._foo;
         }
      }

      console.log(SomeClass);
      console.log(new SomeClass(44));
      console.log(new SomeClass(23));
   });
   it('performsMixins', () => {
      interface Colorful {
         color: string;

         getColor(): string;
      }

      function myHandler(clazz: Constructor<Colorful>, annotation: AnnotationProps): Constructor<Colorful>
      {
         return class extends clazz
         {
            color: string;

            constructor(...args: any[])
            {
               super(...args);
               this.color = annotation.name;
               console.log(this.color, annotation.name);
               console.log(`Augmented ${JSON.stringify(this)} constructor call on ${JSON.stringify(annotation)} with ${args} of ${typeof args[0]}`);
            }

            getColor(): string {
               return this.color;
            }
         }
      }

      const Annotated = sut.makeActiveClassAnnotation(AnnotationProps, myHandler);

      @Annotated('blue', 12)
      class MixinBase {
         color: string;

         getColor(): string {
            throw new Error('Wrong implementation');
         }
      }

      console.log(MixinBase);
      console.log(new MixinBase());
      console.log(new MixinBase().getColor());
   });
});

