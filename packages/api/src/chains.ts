import {ITx, ITx2, ITx3} from "./api";

export type ITxFrom<From, To> =
    ITx<From, To> |
    ITx2<From, unknown, To> |
    ITx2<unknown, From, To> |
    ITx3<unknown, unknown, From, To> |
    ITx3<unknown, From, unknown, To> |
    ITx3<From, unknown, unknown, To>;

export interface IChainTxBuilder<Current, Last> {
    addChain<Next>(nextToCurrent: ITxFrom<Next, Current>): IChainTxBuilder<Next, Last>;
}

class ChainTxBuilder<Current, Last> implements IChainTxBuilder<Current, Last> {
    constructor(private currentToLast: ITx<Current, Last>) {
    }

    addChain<Next>(nextToCurrent: ITxFrom<Next, Current>): IChainTxBuilder<Next, Last> {
        const nextToLast: ITxFrom<Next, Last> =
            (next: Next) => this.currentToLast(
                nextToCurrent(next)
            );
        const nextThis: ChainTxBuilder<Next, Last> = this as unknown as ChainTxBuilder<Next, Last>;
        nextThis.currentToLast = nextToLast;
        return nextThis;
    }

    extract(): ITxFrom<Current, Last> {
        return this.currentToLast;
    }
}


export function createChainTx<From, To>(
    director: ITx<IChainTxBuilder<To, To>, IChainTxBuilder<From, To>>
): ITx<From, To>;
export function createChainTx<From, To, Initial>(
    director: ITx<IChainTxBuilder<Initial, To>, IChainTxBuilder<From, To>>,
    initial: ITx<Initial, To>
): ITx<From, To>;
export function createChainTx<From, To, Initial = To>(
    director: ITx<IChainTxBuilder<Initial, To>, IChainTxBuilder<From, To>>,
    initial: ITx<Initial, To> = (identity: Initial) => identity as unknown as To
): ITx<From, To> {
    const builderIn: ChainTxBuilder<Initial, To> = new ChainTxBuilder(initial);
    const builderOut: ChainTxBuilder<From, To> = director(builderIn) as ChainTxBuilder<From, To>;
    return builderOut.extract();
}
