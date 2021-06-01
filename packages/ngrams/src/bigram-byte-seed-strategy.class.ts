import { NGramByteSeedStrategy } from './n-gram-byte-seed-strategy.class';

export class TrigramByteSeedStrategy extends NGramByteSeedStrategy {
    constructor(wordLength: number = 4) {
        super("../english_trigrams.txt", 3, wordLength);
    }
}