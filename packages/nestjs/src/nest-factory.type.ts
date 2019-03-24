export type NestFactory<Component extends {}> =
   ((...args: any[]) => Component) |
   ((...args: any[]) => Promise<Component>);
