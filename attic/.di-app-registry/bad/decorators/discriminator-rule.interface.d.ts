export declare type DiscriminatorRuleType = 'named' | 'tagged' | 'multiBouind' | 'none' | 'custom';
export interface NamedDiscriminator {
    type: 'named';
    name: string;
}
export interface TaggedDiscriminator {
    type: 'tagged';
    key: PropertyKey;
    value: any;
}
export interface MultiBoundDiscriminator {
    type: 'multiBound';
}
export interface NoDiscriminator {
    type: 'none';
}
export interface CustomDiscriminator {
    type: 'custom';
}
