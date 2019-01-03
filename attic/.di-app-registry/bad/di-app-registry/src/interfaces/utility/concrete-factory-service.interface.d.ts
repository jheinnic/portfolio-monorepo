export declare type ConcreteFactoryService<K extends keyof any, T, P extends any[] = any[]> = {
    [Key in K]: ((...args: P) => T);
};
