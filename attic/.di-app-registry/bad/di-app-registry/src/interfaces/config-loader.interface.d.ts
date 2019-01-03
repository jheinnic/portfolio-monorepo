import { ClassType } from 'class-transformer-validator';
export interface IConfigLoader {
    getConfig<T extends object>(configClass: ClassType<T>, rootPath?: string): T;
}
