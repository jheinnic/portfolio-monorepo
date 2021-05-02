import { PublicKeyFilePath } from './public-key-file-path.interface';
import { PrivateKeyFilePath } from './private-key-file-path.interface';
export declare type KeyFilePath = PublicKeyFilePath | PrivateKeyFilePath;
export declare function isPubicKey(filePath: KeyFilePath): filePath is PublicKeyFilePath;
export declare function isPrivateKey(filePath: KeyFilePath): filePath is PrivateKeyFilePath;
//# sourceMappingURL=key-file-path.type.d.ts.map