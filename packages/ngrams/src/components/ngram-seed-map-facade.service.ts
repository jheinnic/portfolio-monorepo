import { Injectable } from '@nestjs/common';

import {parseNgramDomainFile} from "./parse-ngram-domain.function";
import {seedWordsByHashRing} from "./seed-words-by-hashring.function";
import {AsyncIterableX} from "ix/Ix.dom.asynciterable";
import {seedWordsByPdf} from "./seed-words-by-pdf.function";
import {INgramSeedMapFacade} from "../interfaces/ngram-seed-map-facade.interface";

@Injectable()
export class NgramSeedMapFacade implements INgramSeedMapFacade {
    constructor() {
    }

    quadgramHashRingMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string> {
        return source.pipe(
            seedWordsByHashRing(
                parseNgramDomainFile('../../english_quadgrams.txt'), 250000
            )
        );
    }

    quadgramPdfMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string> {
        return source.pipe(
            seedWordsByPdf(
                parseNgramDomainFile('../../english_quadgrams.txt')
            )
        );
    }

    trigramHashRingMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string> {
        return source.pipe(
            seedWordsByHashRing(
                parseNgramDomainFile('../../english_trigrams.txt'), 250000
            )
        );
    }

    trigramPdfMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string> {
        return source.pipe(
            seedWordsByPdf(
                parseNgramDomainFile('../../english_trigrams.txt')
            )
        );
    }

    bigramHashRingMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string> {
        return source.pipe(
            seedWordsByHashRing(
                parseNgramDomainFile('../../english_bigrams.txt'), 250000
            )
        );
    }

    bigramPdfMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string> {
        return source.pipe(
            seedWordsByPdf(
                parseNgramDomainFile('../../english_bigrams.txt')
            )
        );
    }

    shortHashRingMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string> {
        return source.pipe(
            seedWordsByHashRing(
                parseNgramDomainFile('../../english_ngrams_short.txt'), 250000
            )
        );
    }

    shortPdfMap(source: AsyncIterableX<AsyncIterableX<number>>): AsyncIterableX<string> {
        return source.pipe(
            seedWordsByPdf(
                parseNgramDomainFile('../../english_ngrams_short.txt')
            )
        );
    }
}