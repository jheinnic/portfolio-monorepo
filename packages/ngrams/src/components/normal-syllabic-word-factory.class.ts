import { ISyncFactoryObject } from "@jchptf/api";
import { Nullable } from 'simplytyped';
import { Chance } from 'chance';

export class NormalSyllabicWordFactoryClass implements ISyncFactoryObject<string> {
    private ch: Chance.Chance;

    constructor(ch: Nullable<Chance.Chance>, private mean: number = 5.5, private dev: number = 1.5) {
        if (!!ch) {
            this.ch = ch;
        } else {
            this.ch = new Chance();
        }
    }

    public rollWord(): string {
        return this.create();
    }

    public create(): string {
        const syllables = Math.round(
            Math.max(
                3, this.ch.normal({ mean: this.mean, dev: this.dev })
            )
        );

        return this.ch.word({syllables});
    }
}