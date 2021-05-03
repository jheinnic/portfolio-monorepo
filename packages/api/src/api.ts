export const EVENT_ALL = '*';
export const EVENT_ENABLE = 'enable';
export const EVENT_DISABLE = 'disable';

/**
 * `id` property declaration.
 */
export interface IID<T extends Exclude<any, symbol>> {
   readonly id: T extends symbol ? never : T;
}

export interface IEvent extends IID<Exclude<PropertyKey, symbol>> {
   target?: any;
   canceled?: boolean;
   value?: any;
}

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
// export type IFactoryObject<Type> = {
//    create(): Type;
// } | {
//    create(): Promise<Type>;
// } | {
//    create(): Type | Promise<Type>;
// };

export type ISyncFactoryMethod<Type, Args extends any[] = []> =
  (...args: Args) => Type;
export type ISyncFactoryObject<Type, Args extends any[] = []> = {
   create: ISyncFactoryMethod<Type, Args>;
};

export type IAsyncFactoryMethod<Type, Args extends any[] = []> =
   (...args: Args) => Promise<Type>;
export type IAsyncFactoryObject<Type, Args extends any[] = []> = {
   create: IAsyncFactoryMethod<Type, Args>;
};

export type IFactoryMethod<Type, Args extends any[] = []> =
  (...args: Args) => Type | Promise<Type>;
export type IFactoryObject<Type, Args extends any[] = []> = {
   create: IFactoryMethod<Type, Args>;
};

export type ISyncFactory<Type, Args extends any[] = []> =
   ISyncFactoryObject<Type, Args> | ISyncFactoryMethod<Type, Args>;
export type IAsyncFactory<Type, Args extends any[] = []> =
   IAsyncFactoryObject<Type, Args> | IAsyncFactoryMethod<Type, Args>;
export type IFactory<Type, Args extends any[] = []> =
   IFactoryObject<Type, Args> | IFactoryMethod<Type, Args>;

export async function asyncCreate<Type>(
   factory: IAsyncFactory<Type> | IFactory<Type>): Promise<Type> {
   if (typeof factory === 'function') {
      return factory();
   }

   return factory.create();
}

export function syncCreate<Type>(factory: ISyncFactory<Type>): Type {
   if (typeof factory === 'function') {
      return factory();
   }

   return factory.create();
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
 * Generic plain object with all key values of given type.
 */
export interface IObjectOf<T> {
   [id: string]: T;
}

export type IBagOf<T, P extends keyof any> = {
   [K in P]: T;
};

export type IMapTo<T, S extends Record<string, unknown>, P extends keyof S = keyof S> = {
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

export type IAsyncDirector<IBuilder> = (builder: IBuilder) => Promise<void>;

export type IDirectorObj<IBuilder, K extends keyof any = 'apply'> = {
   [Key in K]: IDirector<IBuilder>;
};

export type IAsyncDirectorObj<IBuilder, K extends keyof any = 'apply'> = {
   [Key in K]: IAsyncDirector<IBuilder>;
};
