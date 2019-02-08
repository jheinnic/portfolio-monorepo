export declare type Constructor<T> = new (...args: any[]) => T;
export declare type AdaptedConstructor = {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export interface ClassDecorator<T> {
    (constructor: Constructor<T>): Constructor<T> | void;
}
export declare type ClassDecoratorFactory<T> = (...args: any[]) => ClassDecorator<T>;
export declare type AugmentedConstructor<P, T> = {
    new (augment: P, ...args: any[]): T;
};
export declare type AugmentedClassDecorator<P, T> = (constructor: AugmentedConstructor<P, T>) => AugmentedConstructor<P, T> | void;
export declare type AugmentedClassDecoratorFactory<P, T> = (...args: any[]) => AugmentedClassDecorator<P, T>;
export declare type QualifiedConstructor<M, T extends M> = Constructor<T>;
export declare type QualifiedClassDecorator<M, T extends M> = ClassDecorator<T>;
export declare type QualifiedClassDecoratorFactory<M, T extends M> = ClassDecoratorFactory<T>;
export declare type GenericConstructor<T> = new (...args: any[]) => T;
export declare type GenericConstructorFunction<T> = GenericConstructor<T> & Function;
export declare type GenericClassDecorator<T> = (constructor: GenericConstructorFunction<T>) => GenericConstructorFunction<T> | void;
export declare type GenericClassDecoratorFactory<T> = (...args: any[]) => GenericClassDecorator<T>;
