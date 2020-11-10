export interface Mixable {
   onConflict: <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => MethodDecorator;
}
