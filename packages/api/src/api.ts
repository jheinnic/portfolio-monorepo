export const EVENT_ALL = "*";
export const EVENT_ENABLE = "enable";
export const EVENT_DISABLE = "disable";

/**
 * Event listener.
 */
export type Listener = (e: IEvent) => void;

/**
 * Lookup path for nested data structures.
 * export type Path = PropertyKey | PropertyKey[];
 */

/**
 * Observer function for `IWatch` implementations.
 */
export type Watch<T> = (id: string, oldState: T, newState: T) => void;

/**
 * Generic interface for reference types (value wrappers).
 */
export interface IAdapter<T> {
   /**
    * Returns wrapped value.
    */
   unwrap(): T;
}

/**
 * Generic interface for objects that implement a no-args contract that creates
 * an instance of their given generic type when called.
 *
 * Factory objects may yield their output artifact either synchronously or
 * asynchronously, and may not expect any input arguments through their IFactory
 * interface method, although other aspects of their operational lifecycle may
 * certainly involve parameter-setting.
 */
export interface IFactory<Type> {
    create(): Type | Promise<Type>;
}


/**
 * Generic interface for types with binary backing buffers.
 */
export interface IBuffered {
    /**
     * An implementation's publicly accessible backing array /
     * ArrayBuffer (usually a typed array instance).
     */
    buffer: ArrayBufferLike;
    /**
     * Returns an Uint8Array view of backing array.
     */
    bytes?(): Uint8Array;
}

/**
 * Generic interface for cloneable types.
 */
export interface ICopy<T> {
    /**
     * Returns a copy of this instance. Shallow or deep copies are
     * implementation specific.
     */
    copy(): T;
}

/**
 * Interface to provide enabled/disabled functionality. Also see
 * `@mixins/IEnable` decorator mixin
 *
 * @see mixins/IEnable
 */
export interface IEnable {
    isEnabled(): boolean;

    /**
     * Disables this entity.
     */
    disable(): void;

    /**
     * Enables this entity.
     */
    enable(): void;

    toggle?(): boolean;
}

export interface IEvent extends IID<Exclude<PropertyKey, symbol>> {
    target?: any;
    canceled?: boolean;
    value?: any;
}

/**
 * Interface to provide event emitter functionality. Also see `@mixins.INotify`
 * decorator mixin
 *
 * @see mixins/INotify
 */
export interface INotify {
    addListener(id: string, fn: Listener, scope?: any): boolean;
    removeListener(id: string, fn: Listener, scope?: any): boolean;
    notify(event: IEvent): void;
}

/**
 * `id` property declaration.
 */
export interface IID<T> {
    readonly id: T extends symbol ? never : T;
}

/**
 * Generic plain object with all key values of given type.
 */
export interface IObjectOf<T> {
    [id: string]: T;
}

export type IBagOf<T, P extends keyof any> = {
    [K in P]: T;
};

export type IMapTo<T, S extends object, P extends keyof S = keyof S> = {
   [K in P]: T;
};

export type Wild<P extends keyof any = keyof any> = IMapTo<any, any, P>;

export type SymbolEnum<P extends keyof any = keyof any> = IMapTo<symbol, any, P>;

/**
 * Interface for types supported the release of internal resources.
 */
export interface IRelease {
    release(opt?: any): boolean;
}

/**
 * Interface for types offering observers of internal value changes.
 * Also see `@IWatch` decorator mixin.
 *
 * @see mixins/iWatch
 */
export interface IWatch<T> {
    addWatch(id: string, fn: Watch<T>): boolean;
    removeWatch(id: string): boolean;
    notifyWatches(oldState: T, newState: T): void;
}

export type IDirector<IBuilder> = (builder: IBuilder) => void;

export type IDirectorObj<IBuilder, K extends keyof any = 'apply'> = {
    [Key in K]: IDirector<IBuilder>;
};
