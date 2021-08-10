import {IllegalArgumentError} from "@thi.ng/errors";

export function* range(start: number, stop: number) {
    let ii = start;
    while (ii < stop) {
        yield ii
        ii = ii + 1
    }
}

function ringMax(p: number, e: number) {
    return (p - 1) * Math.pow(p, e-1);
}

export function* wind_g_for_p_to_e(g: number, p: number, e: number) {
    let ii: number = 0;
    let x: number = g;
    const p_to_e: number = Math.pow(p, e);
    const end: number = ringMax(p, e);
    for (ii of range(0, end )) {
        yield x
        x = (x * g) % p_to_e
    }
}

export function* dense_wind_g_for_p_to_e(g: number, p: number, e: number) {
    const outer: number[] = [p];
    const inner: number[] = [p - 1];
    let ii: number = 0;
    for (ii of range(0, e - 1)) {
        outer.push(outer[ii] * p);
        inner.push(inner[ii] * p);
    }
    let x: number = 0;
    for (x of wind_g_for_p_to_e(g, p, e)) {
        ii = e - 1;
        let adj_x = 0;
        let remainder = 0;
        while (ii >= 0) {
            remainder = (x % outer[ii]);
            adj_x = adj_x + (((x - remainder) / outer[ii]) * inner[ii]);
            x = remainder;
            ii = ii - 1;
        }
        yield (adj_x + remainder)
    }
}

/**
 * Requests a generator for a prime power ring ordered sequence of integers ranging
 * from [1, cap].  This is implemented by discarding all values in the range [cap+1, max],
 * so is most efficient when the density of the prime power ring is greater than cap
 * by as small a margin as possible.  However, that density must be at least as great
 * as cap or the sequence is undefined and will yield an exception when requested.
 *
 * @param cap
 * @param g
 * @param p
 * @param e
 * @returns {Generator<*|number, void, *>}
 */
export function* capped_dense_wind_g_for_p_to_e(cap: number, g: number, p: number, e: number) {
    let n: number = ringMax(p, e);
    if (cap > n) {
        throw new IllegalArgumentError(`Insufficient ring size.  Capacity(${cap}) is > RingMax(${n})`);
    }
    let x = 0;
    for (x of dense_wind_g_for_p_to_e(g, p, e)) {
        if (x <= cap) {
            yield(x);
        }
    }
}