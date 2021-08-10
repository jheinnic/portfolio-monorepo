import {AsyncIterableX} from "ix/Ix.dom.asynciterable";

export interface INgramSeedMapFacade {
    quadgramHashRingMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string>;

    quadgramPdfMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string>;

    trigramHashRingMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string>;

    trigramPdfMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string>;

    bigramHashRingMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string>;

    bigramPdfMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string>;

    shortHashRingMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string>;

    shortPdfMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string>;

}
