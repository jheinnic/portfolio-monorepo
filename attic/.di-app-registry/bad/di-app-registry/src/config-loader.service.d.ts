import { ClassType } from 'class-transformer-validator';
import '@jchptf/reflection';
import { IConfigLoader } from '../../config/src/interfaces/index';
export declare class ConfigLoader implements IConfigLoader {
    private readonly config;
    private readonly mapToDefaults;
    constructor();
    getConfig<T extends {}>(configClass: ClassType<T>, rootPath?: string): T;
}
