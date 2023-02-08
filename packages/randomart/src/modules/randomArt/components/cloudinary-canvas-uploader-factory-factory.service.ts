import {CloudinaryCanvasUploadFactory} from './cloudinary-canvas-upload-factory.class';

class CloudinaryCanvasUploadFactoryFactory {
    constructor(private readonly _envelopeEncryption: IEnvelopeEncryptionService) {
    }

    openCredentials(_accountId: String,
                    _encryptedAccountKey: String,
                    _encryptedDataKey: String): CloudinaryCanvasUploadFactory
    {
        const dataKey = this.decrypt_key(_encryptedDataKey);
        const accountKey = this.decrypt_data(_encryptedAccountKey, dataKey);
        return new CloudinaryCanvasUploadFactory(_accountId, accountKey);
    }

    private decrypt_key(encryptedDataKey: String): String {
        return encryptedDataKey;
    }

    private decrypt_data(decryptedDataKey: String, encryptedData: String): String {
        return encryptedData;
    }
}