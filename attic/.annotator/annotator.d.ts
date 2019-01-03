/**
 * Created by jheinnic on 4/20/17.
 */
import { Type } from 'reflect-helper';
import { Constructor, IAnnotator, UniversalDecorator } from './api';
/**
 * A static class utility that offers a simpler implementation than the Reflector implementation, but offers
 * less functionality.
 *
 * Implementation is largely delegated to the reflect-helpers polyfill library.
 */
export declare class Annotator implements IAnnotator {
    /**
     * Get the decorator instance of a given type from an object (using its constructor
     * function type) or constructor function (using itself).
     *
     * @param target Object whose constructor function is to be queried or that constructor function itself.
     * @param annotationType The type of annotation class to return.
     * @param inherit Search subclasses as well iff true.  False by default.
     */
    static getAnnotations<T>(target: Object, annotationType: Constructor<T>, inherit?: boolean): T[];
    static getAnnotations<T>(target: Constructor<any>, annotationType: Constructor<T>, inherit?: boolean): T[];
    static getAnnotations<T>(target: Function, annotationType: Constructor<T>, inherit?: boolean): T[];
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
    static makeClassAnnotation(annotationType: Constructor<any>): (...args: any[]) => ClassDecorator;
    static makeMethodAnnotation(annotationType: Constructor<any>): (...args: any[]) => MethodDecorator;
    static makePropertyAnnotation(annotationType: Constructor<any>): (...args: any[]) => PropertyDecorator;
    static makeParameterAnnotation(annotationType: Constructor<any>): (...args: any[]) => ParameterDecorator;
    static makeUniversalAnnotation(annotationType: Constructor<any>): (...args: any[]) => UniversalDecorator;
    makeClassAnnotation(annotationType: Constructor<any>): (...args: any[]) => ClassDecorator;
    makePropertyAnnotation(annotationType: Constructor<any>): (...args: any[]) => PropertyDecorator;
    makeMethodAnnotation(annotationType: Constructor<any>): (...args: any[]) => MethodDecorator;
    makeParameterAnnotation(annotationType: Constructor<any>): (...args: any[]) => ParameterDecorator;
    makeUniversalAnnotation(annotationType: Constructor<any>): (...args: any[]) => UniversalDecorator;
    static getType(clazz: Object): Type;
    static getType(clazz: Constructor<any>): Type;
    static getType(clazz: Function): Type;
    getType(clazz: Object): Type;
    getType(clazz: Constructor<any>): Type;
    getType(clazz: Function): Type;
    makeActiveClassAnnotation<T>(annotationType: Constructor<T>, interceptor: (clazz: Function, annotation: T) => Function): (...args: any[]) => ClassDecorator;
}
