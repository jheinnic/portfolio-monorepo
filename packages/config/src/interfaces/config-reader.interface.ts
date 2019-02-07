export interface IConfigReader {
   bootstrap(): void;

   readConfigKey<T extends any = any>(configKey: string, defaultValue?: T): T;
}