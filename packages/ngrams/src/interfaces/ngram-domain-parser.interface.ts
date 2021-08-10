import {NgramListItem} from "./ngram-list-item.type";
import {ITx} from "@jchptf/api";
import {AsyncIterableX} from "ix/Ix.dom.asynciterable";

export interface INgramDomainParser {
    parseDomainFile: ITx<string, AsyncIterableX<NgramListItem>>;
}
