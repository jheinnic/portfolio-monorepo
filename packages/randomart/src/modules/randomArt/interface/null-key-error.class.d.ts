export interface NullKeyError extends Error {
}

export interface NullKeyErrorConstructor {
    new(): NullKeyError;
}

function NullKeyErrorImpl(this: any) {
    Error.call(this);
    this.message = 'Key cannot be null';
    // this.name = 'NullKeyError';
    return this;
}

NullKeyErrorImpl.prototype = Object.create(Error.prototype);

export declare const NullKeyError: NullKeyErrorConstructor = NullKeyErrorImpl as any;


