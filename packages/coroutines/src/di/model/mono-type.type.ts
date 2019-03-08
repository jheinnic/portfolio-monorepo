export type MonoType<T extends any> = T extends Array<any> ? never : T;
