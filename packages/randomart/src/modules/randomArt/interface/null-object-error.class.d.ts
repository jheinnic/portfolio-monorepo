export interface NullObjectError extends Error {
}

export interface NullObjectErrorConstructor {
    new(): NullObjectError;
}

function NullObjectErrorImpl(this: any) {
    Error.call(this);
    this.message = 'Object cannot be null';
    // this.name = 'NullObjectError';
    return this;
}

NullObjectErrorImpl.prototype = Object.create(Error.prototype);

export declare const NullObjectError: NullObjectErrorConstructor = NullObjectErrorImpl as any;


