import {TupleOfLength} from "@jchptf/tupletypes";

export interface IPrimePowerRingProvider {
    jumbledTuplesTour<Item, Count extends number>(
        items: Item[], seatCount: Count,  withReplacement: boolean
    ): Iterable<TupleOfLength<Item, Count>>

    jumbledPairsTour<Item>(items: Item[], withReplacement: boolean): Iterable<[Item, Item]>

    jumbledTriplesTour<Item>(items: Item[], withReplacement: boolean): Iterable<[Item, Item, Item]>
}