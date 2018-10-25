/**
 * Created by jheinnic on 4/20/17.
 */
import {getType, makeDecorator, Type} from 'reflect-helper';
import {Constructor, IAnnotator, UniversalDecorator} from './api';

// export type Help = (target: Object, propertyName?: string|symbol, parameterIndex?: number) => void;

/**
 * A static class utility that offers a simpler implementation than the Reflector implementation, but offers
 * less functionality.
 *
 * Implementation is largely delegated to the reflect-helpers polyfill library.
 */
export class Annotator implements IAnnotator
{
   /**
    * Get the decorator instance of a given type from an object (using its constructor
    * function type) or constructor function (using itself).
    *
    * @param target Object whose constructor function is to be queried or that constructor function itself.
    * @param annotationType The type of annotation class to return.
    * @param inherit Search subclasses as well iff true.  False by default.
    */
   static getAnnotations<T>(target: Object, annotationType: Constructor<T>, inherit?: boolean): T[];
   static getAnnotations<T>(
     target: Constructor<any>, annotationType: Constructor<T>, inherit?: boolean): T[];
   static getAnnotations<T>(target: Function, annotationType: Constructor<T>, inherit?: boolean): T[];
   static getAnnotations<T>(
     target: Object | Constructor<any> | Function, annotationType: Constructor<T>,
     inherit: boolean = false): T[]
   {
      return Annotator.getType(target)
        .getAnnotations(annotationType, inherit);
   }

   /**
    * Get the decorator instance of a given type from an object (using its constructor
    * function type) or constructor function (using itself).
    *
    * @param target Object whose constructor function is to be queried or that constructor function itself.
    * @param annotationType The type of annotation class to return.
    * @param inherit Search subclasses as well iff true.  False by default.
    */
   getAnnotations<T>(target: Object, annotationType: Constructor<T>, inherit?: boolean): T[];
   getAnnotations<T>(target: Constructor<any>, annotationType: Constructor<T>, inherit?: boolean): T[];
   getAnnotations<T>(target: Function, annotationType: Constructor<T>, inherit?: boolean): T[];
   getAnnotations<T>(
     target: Object | Constructor<any> | Function, annotationType: Constructor<T>,
     inherit: boolean = false): T[]
   {
      return Annotator.getAnnotations(target, annotationType, inherit);
   }

   static makeClassAnnotation(annotationType: Constructor<any>): (...args: any[]) => ClassDecorator
   {
      return makeDecorator(annotationType);
   }

   static makeMethodAnnotation(annotationType: Constructor<any>): (...args: any[]) => MethodDecorator
   {
      return makeDecorator(annotationType) as (...args: any[]) => MethodDecorator
   }

   static makePropertyAnnotation(annotationType: Constructor<any>): (...args: any[]) => PropertyDecorator
   {
      return makeDecorator(annotationType) as (...args: any[]) => PropertyDecorator;
   }

   static makeParameterAnnotation(annotationType: Constructor<any>): (...args: any[]) => ParameterDecorator
   {
      return makeDecorator(annotationType) as (...args: any[]) => ParameterDecorator;
   }

   static makeUniversalAnnotation(annotationType: Constructor<any>): (...args: any[]) => UniversalDecorator
   {
      return makeDecorator(annotationType) as (...args: any[]) => UniversalDecorator;
   }

   makeClassAnnotation(annotationType: Constructor<any>): (...args: any[]) => ClassDecorator
   {
      return Annotator.makeClassAnnotation(annotationType);
   }

   makePropertyAnnotation(annotationType: Constructor<any>): (...args: any[]) => PropertyDecorator
   {
      return Annotator.makePropertyAnnotation(annotationType);
   }

   makeMethodAnnotation(annotationType: Constructor<any>): (...args: any[]) => MethodDecorator
   {
      return Annotator.makeMethodAnnotation(annotationType);
   }

   makeParameterAnnotation(annotationType: Constructor<any>): (...args: any[]) => ParameterDecorator
   {
      return Annotator.makeParameterAnnotation(annotationType);
   }

   makeUniversalAnnotation(annotationType: Constructor<any>): (...args: any[]) => UniversalDecorator
   {
      return Annotator.makeUniversalAnnotation(annotationType);
   }

   static getType(clazz: Object): Type;
   static getType(clazz: Constructor<any>): Type;
   static getType(clazz: Function): Type;
   static getType(clazz: Object | Constructor<any> | Function): Type
   {
      let param: Constructor<any>;

      if (isConstructor(clazz)) {
         param = clazz;
      } else {
         param = <Constructor<any>> clazz.constructor;
      }

      return getType(param);
   }

   getType(clazz: Object): Type;
   getType(clazz: Constructor<any>): Type;
   getType(clazz: Function): Type;
   getType(clazz: Object | Constructor<any> | Function): Type
   {
      return Annotator.getType(clazz)
   }

   makeActiveClassAnnotation<T>(
     annotationType: Constructor<T>,
     interceptor: (clazz: Function, annotation: T) => Function): (...args: any[]) => ClassDecorator
   {
      const attachAnnotation: (...args: any[]) => ClassDecorator = Annotator.makeClassAnnotation(
        annotationType);

      const handler = {
         apply: function (target, thisArgument, ...argumentsList: any[]) {
            thisArgument;
            console.log(`BModule called: ${new Date().getTime()}`);
            console.log(`Calling ${attachAnnotation} with ${argumentsList}`);
            let classAnnotator = target.apply(attachAnnotation, argumentsList[0]);
            console.log(`Provide returned ${classAnnotator} at ${new Date().getTime()}`);
            return function (target: Function) {
               console.log('Intercepting', target, 'from decorator');
               const annotated = classAnnotator(target) || target;
               console.log('Fetching annotation from', annotated, 'of type', annotationType);
               const instance = Annotator.getAnnotations(annotated, annotationType)[0];
               return interceptor.call(undefined, annotated, instance) || annotated;
            };
         }
      };

      return new Proxy(attachAnnotation, handler);
   }
}

function isConstructor(candidate: Object | Constructor<any> | Function): candidate is Constructor<any>
{
   return candidate.constructor === Function;
}
