import { isKeyOf, Keys, Nullable } from 'simplytyped';
import { FunctionPropertyNames, ValuePropertyNames } from '@jchptf/objecttypes';
import { FunctionProperties, ValueProperties } from '@jchptf/objecttypes';
import { MixableConstructor } from './make-simple-mixin.function';

export type ConflictHandler<Mixin, Key extends Keys<Mixin>> =
   (key: PropertyKey, desc: PropertyDescriptor, mixinValue: Mixin[Key]) => PropertyDescriptor | undefined;

export type ConflictPolicy<Mixin extends object, Props extends Keys<Mixin>> = {
   [Key in Props]: ConflictHandler<Mixin, Key>;
};

// export type ValueConflictPolicy<Mixin extends object, Props extends ValuePropertyNames<Mixin> = Keys<object>> =
//    ConflictPolicy<Mixin, Props>;

// export type FunctionConflictPolicy<Mixin extends object, Props extends FunctionPropertyNames<Mixin> = Keys<object>> =
//    ConflictPolicy<Mixin, Props>;

export interface IMixinImplBlock<Mixin extends object, FunctionProps extends FunctionPropertyNames<Mixin> = Keys<object>, ValueProps extends ValuePropertyNames<Mixin> = Keys<object>> {
   implementation: Mixin;
   valueConflicts: ConflictPolicy<Mixin, ValueProps>;
   functionConflicts: ConflictPolicy<Mixin, FunctionProps>;
}

export interface WorkingObjectPair<ScopeSignature> {
   stateObject: ValueProperties<ScopeSignature>;
   behaviorObject: FunctionProperties<ScopeSignature>;
}

export class MixinContent<InstanceSignature extends object, StaticSignature extends object>
{
   constructor(
      readonly instanceContext: IMixinImplBlock<InstanceSignature>,
      readonly staticContext: IMixinImplBlock<StaticSignature>)
   {
      console.log(this.instanceContext, this.staticContext);
   }
}

function defineMixinProperty<ScopeSignature extends object, Key extends Keys<ScopeSignature>>(
   targetObj: WorkingObjectPair<ScopeSignature>, key: PropertyKey, mixinDef: IMixinImplBlock<ScopeSignature>,
   mixinValue: ScopeSignature[Key], existing?: PropertyDescriptor,
): void
{
   let handlerDescriptor: Nullable<PropertyDescriptor>;
   let propertyTarget: FunctionProperties<ScopeSignature> | ValueProperties<ScopeSignature>;

   if (!existing) {
      // Object.defineProperty(targetObj, key, {
      handlerDescriptor = {
         value: mixinValue,
         writable: Object.getOwnPropertyDescriptor(mixinDef.implementation, key)!.writable,
         configurable: true,
         enumerable: mixinDef.implementation.propertyIsEnumerable(key),
      };

      if (mixinValue instanceof Function) {
         propertyTarget = targetObj.behaviorObject;
      } else {
         propertyTarget = targetObj.stateObject;
      }
   } else {
      if (isKeyOf(mixinDef.valueConflicts, key)) {
         const conflictHandler: ConflictHandler<ScopeSignature, Key> =
            mixinDef.valueConflicts[key];

         handlerDescriptor = conflictHandler(key, existing, mixinValue);
         propertyTarget = targetObj.stateObject;
      } else if (isKeyOf(mixinDef.functionConflicts, key)) {
         const conflictHandler: ConflictHandler<ScopeSignature, Key> =
            mixinDef.functionConflicts[key];

         handlerDescriptor = conflictHandler(key, existing, mixinValue);
         propertyTarget = targetObj.behaviorObject;
      } else {
         console.warn(`No descriptor conflict handler found for ${key.toString()}.  Not patching.`);
         return;
      }
   }

   if (!!handlerDescriptor) {
      handlerDescriptor.configurable = true;
      Object.defineProperty(propertyTarget, key, handlerDescriptor);
   } else {
      console.warn(
         `Conflict handler rejected ${key.toString()}.  Not patching.`);
   }
}

function mixinContentBlock<MixinScope extends object>(
   targetObj: WorkingObjectPair<MixinScope>,
   baseObj: WorkingObjectPair<MixinScope>,
   mixinImpl: IMixinImplBlock<MixinScope>): void
{
   const instanceKeys: PropertyKey[] = Reflect.ownKeys(mixinImpl.implementation);

   for (const key of instanceKeys) {

      let mixinValue: any;
      if (isKeyOf(mixinImpl.implementation, key)) {
         mixinValue = mixinImpl.implementation[key];
      }

      if (mixinValue instanceof Function) {
         const existing = Object.getOwnPropertyDescriptor(baseObj.behaviorObject, key);
         defineMixinProperty(targetObj, key, mixinImpl, mixinValue, existing);
      } else {
         const existing = Object.getOwnPropertyDescriptor(baseObj.stateObject, key);
         defineMixinProperty(targetObj, key, mixinImpl, mixinValue, existing);
      }
   }
}

/**
 * If you have an abstract class where the mixin logic has been implemented, you can
 * use it to derive the signatures for InstanceMixin and StaticMixin.  Presuming that
 * 'MixinClass' is the name of your template class, a compatible signature for
 * MixinContent would be:
 *
 *    new MixinContent<MixinClass, Omit<typeof MixinClass, 'prototype'>>( ... )
 *
 * @param mixinContent Container object holding the state and behavior of a mixin's
 *        instance and static implementation, as well as any policy handlers required
 *        for reconciling conflicts with existing policies.  Examples where such
 *        conflicts may be expected include 'middleware' style mixins that are meant
 *        to co-exist and chain in order of their attachment by delegation through a
 *        'next()' method passed to among their input arguments.
 */
export function mixinPlus<InstanceMixin extends object, StaticMixin extends object>(
   mixinContent: MixinContent<InstanceMixin, StaticMixin>)
{
   const typeTag = Symbol('isa');

   function _mixin<C extends MixableConstructor>(Target: C)
   {
      const instanceDefaults: any = { };
      const MixinTarget = class MixinTarget extends Target {
         constructor(...args: any[]) {
            super(...args);

            Object.assign(this, instanceDefaults);

            return this;
         }
      };

      if (!!mixinContent.instanceContext) {
         const targetContext = {
            stateObject: instanceDefaults,
            behaviorObject: MixinTarget.prototype,
         };
         const baseContext = {
            stateObject: Target.prototype,
            behaviorObject: Target.prototype,
         };
         mixinContentBlock(targetContext, baseContext, mixinContent.instanceContext);
      }

      if (!!mixinContent.staticContext) {
         const targetContext = {
            stateObject: MixinTarget as unknown as ValueProperties<StaticMixin>,
            behaviorObject: MixinTarget as unknown as FunctionProperties<StaticMixin>,
         };
         const baseContext = {
            stateObject: Target as unknown as ValueProperties<StaticMixin>,
            behaviorObject: Target as unknown as FunctionProperties<StaticMixin>,
         };
         mixinContentBlock(targetContext, baseContext, mixinContent.staticContext);
      }

      Object.defineProperty(MixinTarget.prototype, typeTag, { value: true });
      Object.defineProperty(
         MixinTarget.prototype.constructor,
         Symbol.hasInstance,
         { value: (x: any) => !!x[typeTag] },
      );

      return MixinTarget.prototype.constructor;
   }

   // Object.defineProperty(
   //    _mixin,
   //    Symbol.hasInstance,
   //    {value: (x: any) => !!x[typeTag]});

   return _mixin;
}
