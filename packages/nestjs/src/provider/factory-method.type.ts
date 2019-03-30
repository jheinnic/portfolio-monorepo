export type FactoryMethod<Component extends {}> =
   ((...args: any[]) => Component) | ((...args: any[]) => Promise<Component>);
