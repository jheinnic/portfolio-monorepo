import {IPrimePowerRingProvider} from "./prime-power-ring-provider.interface";
import {TupleOfLength} from "../../../tupletypes/src";
import {IllegalArgumentError, UnsupportedOperationError} from "@thi.ng/errors";
import {capped_dense_wind_g_for_p_to_e, range} from "./sequence.function";

export class PrimePowerRingProvider implements IPrimePowerRingProvider {
    constructor(
        private readonly generator: number,
        private readonly base_prime: number,
        private readonly prime_power: number
    ) {

    }
    jumbledPairsTour<Item>(items: Item[], withReplacement: boolean): Iterable<[Item, Item]> {
        return this.jumbledTuplesTour(items, 2, withReplacement) as Iterable<[Item, Item]>;
    }

    jumbledTriplesTour<Item>(items: Item[], withReplacement: boolean): Iterable<[Item, Item, Item]> {
        return this.jumbledTuplesTour(items, 3, withReplacement) as Iterable<[Item, Item, Item]>;
    }

    * jumbledTuplesTour<Item, Count extends number>(
        items: Item[], seatCount: Count, withReplacement: boolean
    ): Iterable<TupleOfLength<Item, Count>> {
        if (! withReplacement) {
            throw new UnsupportedOperationError("Jumbled tours without replacement not implemented yet");
        }
        if (!items || items.length < 2) {
            throw new IllegalArgumentError();
        }
        if (seatCount > items.length) {
            throw new IllegalArgumentError();
        }
        if (seatCount < 1) {
            throw new IllegalArgumentError();
        }

        const maxPermute: number = Math.pow(items.length, seatCount);
        let permuteIndex: number
        for (permuteIndex of capped_dense_wind_g_for_p_to_e(
            maxPermute, this.generator, this.base_prime, this.prime_power)
        ) {
            permuteIndex = permuteIndex - 1;
            const retval: Item[] = [];
            let idx: number;
            for (idx of range(0, seatCount)) {
                const nextIndex = permuteIndex % items.length;
                let nextDiv = permuteIndex / items.length;
                nextDiv = Math.floor(nextDiv);
                permuteIndex = nextDiv;
                console.log("DEBUG!  " + nextDiv + ", " + permuteIndex + ", " + nextIndex)
                retval.push(items[nextIndex]);
            }

            yield retval as TupleOfLength<Item, Count>;
        }
    }

}