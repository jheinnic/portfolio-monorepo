import { default as binarySearch } from 'binary-search'


export class ZScoreUtil {
    private readonly scoreTable: number[];

    constructor( ) {
        this.scoreTable = require('./zscore_table.json');
    }

    probability_to_zscore(p: number): number {
        let isNegative: boolean = false;
        if (p < 0.5) {

            isNegative = true;
            p = 1.0 - p;
        }

        let findIdx = binarySearch(this.scoreTable, p, (x, y) => x - y);
        if (findIdx < 0) {
            findIdx = (-1 * findIdx) - 1;
        }
        findIdx = findIdx * 1.0 / 100;
        return isNegative ? (-1 * findIdx) : findIdx;
    }

    zscore_to_value(zScore: number, wordLengthMean: number, wordLengthStdev: number): number {
        return (zScore * wordLengthStdev) + wordLengthMean;
    }
}

