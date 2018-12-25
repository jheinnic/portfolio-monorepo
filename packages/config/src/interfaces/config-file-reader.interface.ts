export interface IConfigFileReader {
   bootstrap(): void;

   readConfigKey<T extends any = any>(configKey: string, defaultValue?: T): T;
}