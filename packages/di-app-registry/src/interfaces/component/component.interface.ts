import {interfaces} from 'inversify';
import {isImmutable, Set as ImmutableSet} from 'immutable';

import {Keys} from 'simplytyped';
import ContainerModuleCallBack = interfaces.ContainerModuleCallBack;
import ServiceIdentifier = interfaces.ServiceIdentifier;

// Called after the Container Registry has dynamically bound all artifacts supplied
// through InstallComponentBuilder to their well known coordinates as specified by
// this instance's originating ComponentDescriptor.
type ComponentWith<Scope extends Keys<any>, K extends Keys<any>> = Component<Scope & K>;

type ScopeWith<Scope extends Keys<any>, K extends Keys<any>> = Scope & K;

type ScopeBindings<Scope extends Keys<any>> = {
   readonly [K in Scope]: ContainerModuleCallBack;
} & object;

// type PartialComponent<Scope extends Keys<any>> = {
//    readonly importsConsumed?: Set<ServiceIdentifier<any>>;
//    readonly exportsProvided?: Set<ServiceIdentifier<any>>;
//    readonly scopeBindings?: Partial<ScopeBindings<Scope>>
// };

function isIterable(input: any | Iterable<any>): input is Iterable<any>
{
   return input.hasOwnProperty(Symbol.iterator);
}

export class Component<Scope extends Keys<any>>
{
   public readonly importsConsumed: ImmutableSet<ServiceIdentifier<any>>;

   public readonly exportsProvided: ImmutableSet<ServiceIdentifier<any>>;

   constructor(
      public readonly scopeBindings: ScopeBindings<Scope>,
      importsConsumed?: Set<ServiceIdentifier<any>> | ImmutableSet<ServiceIdentifier<any>>,
      exportsProvided?: Set<ServiceIdentifier<any>> | ImmutableSet<ServiceIdentifier<any>>)
   {
      this.importsConsumed =
         importsConsumed
            ? isImmutable(importsConsumed)
            ? importsConsumed as ImmutableSet<ServiceIdentifier<any>>
            : ImmutableSet.of(importsConsumed)
            : ImmutableSet();

      this.exportsProvided =
         exportsProvided
            ? isImmutable(exportsProvided)
            ? exportsProvided as ImmutableSet<ServiceIdentifier<any>>
            : ImmutableSet.of(exportsProvided)
            : ImmutableSet();
   }

   withScope(
      scopeKey: string | symbol, callback: ContainerModuleCallBack): ComponentWith<Scope, typeof scopeKey>
   {
      return new Component<ScopeWith<Scope, typeof scopeKey>>(
         Object.assign({}, this.scopeBindings, {[scopeKey]: callback}),
         this.importsConsumed, this.exportsProvided
      );
   }

   withImports(importsConsumed: Set<ServiceIdentifier<any>> | ImmutableSet<ServiceIdentifier<any>>)
   {
      return new Component<Scope>(
         this.scopeBindings,
         isIterable(importsConsumed)
            ? this.importsConsumed.union(importsConsumed)
            : this.importsConsumed.add(importsConsumed),
         this.exportsProvided
      );
   }

   withExports(exportsProvided: ServiceIdentifier<any> | Iterable<ServiceIdentifier<any>>)
   {
      return new Component<Scope>(
         this.scopeBindings,
         this.importsConsumed,
         isIterable(exportsProvided)
            ? this.exportsProvided.union(exportsProvided)
            : this.exportsProvided.add(exportsProvided)
      );
   }
}
