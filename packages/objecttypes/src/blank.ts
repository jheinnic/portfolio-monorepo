export type BlankObject = Object & object;

export type UnlessBlank<T extends object, C extends keyof T = never> =
   C extends never ? BlankObject : Pick<T, C>;
