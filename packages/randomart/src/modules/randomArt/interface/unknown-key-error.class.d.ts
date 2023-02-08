export interface UnknownKeyError extends Error {
}

export interface UnknownKeyErrorConstructor {
    new(key: String): UnknownKeyError;
}

function UnknownKeyErrorImpl(this: any, key: String) {
    Error.call(this);
    this.message = key + ' is an unknown key';
    // this.name = 'UnknownKeyError';
    return this;
}

UnknownKeyErrorImpl.prototype = Object.create(Error.prototype);

export declare const UnknownKeyError: UnknownKeyErrorConstructor = UnknownKeyErrorImpl as any;


