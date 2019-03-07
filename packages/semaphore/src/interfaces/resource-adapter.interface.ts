export interface IResourceAdapter<T extends object> {
   publish(): T;

   recycle(): boolean;

   readonly wetArtifact: T;
}