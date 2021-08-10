import { IterableX } from 'ix/iterable';
import {OperatorFunction} from "ix/interfaces";

class ChunkCountInternal<TSource> extends IterableX<number> {
    private _source: Iterable<TSource>;
    private _chunkSize: number;

    constructor(source: Iterable<TSource>, chunkSize: number) {
        super();
        this._source = source;
        this._chunkSize = chunkSize;
    }
    *[Symbol.iterator]() {
        let i = 0;
        let counter = 0;
        for (let _ of this._source) {
            if (i === this._chunkSize) {
                i = 0;
                counter = counter + 1;
                yield counter;
            }
            i++;
        }
        yield counter + 1;
    }
}

export function countChunks<TSource>(chunkSize: number): OperatorFunction<TSource, number> {
    return function(source: Iterable<TSource>): IterableX<number> {
        return new ChunkCountInternal(source, chunkSize);
    }
}