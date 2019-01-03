import { Type } from 'reflect-helper';
export { Type };
export declare type Constructor<T = {}> = new (...args: any[]) => T;
export declare type UniversalDecorator = ClassDecorator | MethodDecorator | PropertyDecorator | ParameterDecorator;
export interface IAnnotator {
    getAnnotations<T>(clazz: Object, annotationType: Constructor<T>, inherit?: boolean): T[];
    getAnnotations<T>(clazz: Constructor<T>, annotationType: Constructor<T>, inherit?: boolean): T[];
    getAnnotations<T>(clazz: Function, annotationType: Constructor<T>, inherit?: boolean): T[];
    getAnnotations<T>(clazz: Object | Constructor<T> | Function, annotationType: Constructor<T>, inherit?: boolean): T[];
    getType(clazz: Object): Type;
    getType(clazz: Constructor<any>): Type;
    getType(clazz: Function): Type;
    getType(clazz: Object | Constructor<any> | Function): Type;
    makeClassAnnotation<T>(annotationType: Constructor<T>): (...args: any[]) => ClassDecorator;
    makePropertyAnnotation<T>(annotationType: Constructor<T>): (...args: any[]) => PropertyDecorator;
    makeMethodAnnotation<T>(annotationType: Constructor<T>): (...args: any[]) => MethodDecorator;
    makeParameterAnnotation<T>(annotationType: Constructor<T>): (...args: any[]) => ParameterDecorator;
    makeUniversalAnnotation<T>(annotationType: Constructor<T>): (...args: any[]) => UniversalDecorator;
    makeActiveClassAnnotation<T>(annotationType: Constructor<T>, interceptor: (clazz: Function, annotation: T) => Function): (...args: any[]) => ClassDecorator;
}
